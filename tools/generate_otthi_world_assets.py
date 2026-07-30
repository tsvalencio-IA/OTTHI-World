#!/usr/bin/env python3
"""Generate local, tileable OTTHI World PBR-style texture packs.

The script only derives assets from textures already shipped with the project or
creates deterministic procedural maps. It has no network dependency.
"""
from __future__ import annotations

from pathlib import Path
import hashlib
import json
import math
import random

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "textures"
OUT = ROOT / "assets" / "world" / "textures"
OUT.mkdir(parents=True, exist_ok=True)

PACKS = {
    "grass": ("grass-v628.png", 0.90, 1.16, 0.05),
    "road": ("asphalt-v628.png", 0.88, 1.18, 0.07),
    "sidewalk": ("sidewalk-v632.png", 0.91, 1.10, 0.045),
    "water": ("water-ripples-v643.png", 0.23, 1.20, 0.025),
    "wood": ("wood-v628.png", 0.72, 1.18, 0.08),
    "brick": ("brick-v628.png", 0.82, 1.22, 0.095),
    "stone": ("stone-v628.png", 0.86, 1.20, 0.10),
    "roof": ("roof-v628.png", 0.80, 1.24, 0.105),
    "fabric": ("bus-seat-v628.png", 0.94, 1.10, 0.035),
    "school-wall": ("school-wall-v628.png", 0.82, 1.16, 0.07),
    "police-wall": ("police-wall-v628.png", 0.72, 1.18, 0.065),
    "gold-ore": ("gold-ore-v628.png", 0.72, 1.26, 0.11),
    "interior-floor": ("home-floor-v632.png", 0.68, 1.16, 0.075),
    "interior-wall": ("interior-wall-v632.png", 0.88, 1.12, 0.045),
    "market-floor": ("market-floor-v632.png", 0.62, 1.14, 0.055),
    "market-wall": ("market-wall-v632.png", 0.84, 1.16, 0.065),
    "school-floor": ("school-floor-v632.png", 0.64, 1.14, 0.055),
    "fire-wall": ("fire-station-wall-v632.png", 0.76, 1.20, 0.075),
    "concrete": ("concrete-v632.png", 0.87, 1.16, 0.08),
    "city-glass": ("city-glass-v632.png", 0.18, 1.15, 0.035),
    "emergency-metal": ("emergency-metal-v632.png", 0.38, 1.22, 0.055),
}


def rng_for(name: str) -> random.Random:
    seed = int(hashlib.sha256(name.encode("utf-8")).hexdigest()[:16], 16)
    return random.Random(seed)


def tileable_detail(img: Image.Image, name: str) -> Image.Image:
    rng = rng_for(name)
    base = img.convert("RGB").resize((512, 512), Image.Resampling.LANCZOS)
    base = ImageEnhance.Color(base).enhance(1.10)
    base = ImageEnhance.Contrast(base).enhance(1.10)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.25, percent=125, threshold=3))
    arr = np.asarray(base, dtype=np.float32)
    # Deterministic, subtle multi-scale material variation.
    low = np.zeros((64, 64), dtype=np.float32)
    for y in range(64):
        for x in range(64):
            low[y, x] = rng.uniform(-1, 1)
    noise = Image.fromarray(np.uint8((low + 1) * 127.5), "L").resize((512, 512), Image.Resampling.BICUBIC)
    n = (np.asarray(noise, dtype=np.float32) - 127.5) / 127.5
    arr *= (1.0 + n[..., None] * 0.045)
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def luminance(img: Image.Image) -> np.ndarray:
    return np.asarray(ImageOps.grayscale(img), dtype=np.float32) / 255.0


def normal_map(img: Image.Image, strength: float) -> Image.Image:
    h = luminance(img)
    # Wrap gradients at boundaries, preserving seamless repeat.
    gx = np.roll(h, -1, axis=1) - np.roll(h, 1, axis=1)
    gy = np.roll(h, -1, axis=0) - np.roll(h, 1, axis=0)
    nx = -gx * strength * 7.0
    ny = -gy * strength * 7.0
    nz = np.ones_like(nx)
    length = np.sqrt(nx * nx + ny * ny + nz * nz)
    normal = np.stack((nx / length, ny / length, nz / length), axis=-1)
    normal = np.uint8(np.clip((normal * 0.5 + 0.5) * 255.0, 0, 255))
    return Image.fromarray(normal, "RGB")


def roughness_map(img: Image.Image, base: float, name: str) -> Image.Image:
    h = luminance(img)
    rng = np.random.default_rng(int(hashlib.md5(name.encode()).hexdigest()[:8], 16))
    fine = rng.normal(0.0, 0.025, h.shape)
    local = np.abs(h - np.asarray(Image.fromarray(np.uint8(h * 255), "L").filter(ImageFilter.GaussianBlur(3)), dtype=np.float32) / 255.0)
    rough = base + fine + local * 0.22
    rough = np.clip(rough, 0.05, 0.98)
    return Image.fromarray(np.uint8(rough * 255), "L")


def ao_map(img: Image.Image, amount: float) -> Image.Image:
    h = luminance(img)
    blur = np.asarray(Image.fromarray(np.uint8(h * 255), "L").filter(ImageFilter.GaussianBlur(5)), dtype=np.float32) / 255.0
    cavities = np.clip(blur - h, 0, 1)
    ao = np.clip(1.0 - cavities * (2.6 + amount * 8.0), 0.48, 1.0)
    return Image.fromarray(np.uint8(ao * 255), "L")


def height_map(img: Image.Image, contrast: float) -> Image.Image:
    gray = ImageOps.grayscale(img)
    gray = ImageEnhance.Contrast(gray).enhance(contrast)
    return gray


def emissive_map(img: Image.Image, name: str) -> Image.Image:
    arr = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0
    hsv_v = arr.max(axis=-1)
    if name == "water":
        mask = np.clip((arr[..., 2] - arr[..., 0]) * 0.75 + (hsv_v - 0.58) * 0.35, 0, 1)
    elif name in {"city-glass", "emergency-metal", "gold-ore"}:
        mask = np.clip((hsv_v - 0.62) * 1.7, 0, 1)
    else:
        mask = np.zeros(arr.shape[:2], dtype=np.float32)
    rgb = np.uint8(np.stack((mask, mask, mask), axis=-1) * 255)
    return Image.fromarray(rgb, "RGB")


def save_png(img: Image.Image, path: Path) -> None:
    img.save(path, optimize=True, compress_level=9)


def make_procedural(name: str, kind: str) -> Image.Image:
    rng = rng_for(name)
    img = Image.new("RGB", (512, 512), (128, 128, 128))
    draw = ImageDraw.Draw(img)
    if kind == "plastic":
        img.paste((43, 117, 190), (0, 0, 512, 512))
        for y in range(0, 512, 64):
            draw.rectangle((0, y, 512, y + 4), fill=(64, 145, 220))
        for _ in range(180):
            x, y = rng.randrange(512), rng.randrange(512)
            c = rng.randrange(35, 65)
            draw.ellipse((x, y, x + 2, y + 2), fill=(c, c + 45, c + 95))
    elif kind == "tire":
        img.paste((24, 27, 32), (0, 0, 512, 512))
        for y in range(-64, 576, 48):
            draw.polygon([(0, y), (72, y + 24), (0, y + 48)], fill=(45, 49, 56))
            draw.polygon([(512, y), (440, y + 24), (512, y + 48)], fill=(45, 49, 56))
        for x in range(0, 512, 64):
            draw.line((x, 0, x, 512), fill=(16, 18, 22), width=5)
    elif kind == "hero-energy":
        for y in range(512):
            t = y / 511
            draw.line((0, y, 512, y), fill=(int(12 + 18 * t), int(66 + 100 * t), int(120 + 120 * t)))
        for _ in range(70):
            x, y = rng.randrange(512), rng.randrange(512)
            r = rng.randrange(2, 14)
            draw.ellipse((x-r, y-r, x+r, y+r), fill=(80, 220, 255))
    elif kind == "mushroom":
        img.paste((179, 35, 42), (0, 0, 512, 512))
        for _ in range(42):
            x, y = rng.randrange(512), rng.randrange(512)
            r = rng.randrange(12, 28)
            draw.ellipse((x-r, y-r, x+r, y+r), fill=(245, 236, 210))
    elif kind == "foliage":
        img.paste((48, 120, 47), (0, 0, 512, 512))
        for _ in range(360):
            x, y = rng.randrange(512), rng.randrange(512)
            r = rng.randrange(3, 13)
            color = rng.choice([(35, 101, 38), (61, 145, 55), (87, 169, 69), (104, 181, 77)])
            draw.rectangle((x-r, y-r, x+r, y+r), fill=color)
    else:
        raise ValueError(kind)
    return tileable_detail(img, name)


def build_pack(name: str, source_name: str | None, rough: float, contrast: float, normal_strength: float, procedural_kind: str | None = None) -> dict:
    if procedural_kind:
        base = make_procedural(name, procedural_kind)
    else:
        source = SOURCE / str(source_name)
        if not source.is_file():
            raise FileNotFoundError(source)
        base = tileable_detail(Image.open(source), name)
    base = ImageEnhance.Contrast(base).enhance(contrast)
    paths = {
        "baseColor": OUT / f"{name}-basecolor.png",
        "normal": OUT / f"{name}-normal.png",
        "roughness": OUT / f"{name}-roughness.png",
        "ao": OUT / f"{name}-ao.png",
        "height": OUT / f"{name}-height.png",
        "emissive": OUT / f"{name}-emissive.png",
    }
    save_png(base, paths["baseColor"])
    save_png(normal_map(base, normal_strength), paths["normal"])
    save_png(roughness_map(base, rough, name), paths["roughness"])
    save_png(ao_map(base, normal_strength), paths["ao"])
    save_png(height_map(base, 1.45), paths["height"])
    save_png(emissive_map(base, name), paths["emissive"])
    return {key: f"./assets/world/textures/{path.name}" for key, path in paths.items()}


def main() -> None:
    manifest: dict[str, dict] = {}
    for name, (source, rough, contrast, strength) in PACKS.items():
        manifest[name] = build_pack(name, source, rough, contrast, strength)
    for name, kind, rough, strength in [
        ("toy-plastic", "plastic", 0.34, 0.045),
        ("vehicle-tire", "tire", 0.95, 0.11),
        ("hero-energy", "hero-energy", 0.18, 0.04),
        ("mushroom", "mushroom", 0.72, 0.07),
        ("foliage", "foliage", 0.92, 0.08),
    ]:
        manifest[name] = build_pack(name, None, rough, 1.0, strength, procedural_kind=kind)
    manifest_path = ROOT / "assets" / "world" / "pbr-manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps({"version": 700, "generator": "generate_otthi_world_assets.py", "packs": manifest}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {len(manifest)} texture packs in {OUT}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Generate a deterministic checksum inventory for the distributable project tree."""
from __future__ import annotations

import hashlib
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "SHA256SUMS.txt"
IGNORED_PARTS = {".git", "__pycache__", "node_modules"}


def included(path: Path) -> bool:
    relative = path.relative_to(ROOT)
    return path != OUTPUT and not any(part in IGNORED_PARTS for part in relative.parts)


def main() -> None:
    files = sorted((path for path in ROOT.rglob("*") if path.is_file() and included(path)), key=lambda path: path.relative_to(ROOT).as_posix().lower())
    lines = []
    for path in files:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        lines.append(f"{digest}  ./{path.relative_to(ROOT).as_posix()}")
    OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(f"SHA256SUMS.txt: {len(files)} arquivos")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
BASELINE = json.loads(
    (DOCS / 'BASELINE-V6466-VISUAL-FOUNDATION.json').read_text('utf-8')
)
checks: list[dict] = []


def text(relative: str) -> str:
    return (ROOT / relative).read_text('utf-8')


def sha256(relative: str) -> str:
    return hashlib.sha256((ROOT / relative).read_bytes()).hexdigest()


def add(name: str, passed: bool, detail='') -> None:
    checks.append({'name': name, 'passed': bool(passed), 'detail': str(detail)})


def ordered_subsequence(expected: list[str], current: list[str]) -> bool:
    cursor = iter(current)
    return all(any(candidate == name for candidate in cursor) for name in expected)


app = text('app.js')
foundation = text('src/modules/00a-visual-foundation-avatar-v2.js')
render = text('src/modules/11-render-materials-player-model.js')
quality = text('src/modules/09-responsive-ar-quality-diagnostics.js')
nature = text('src/modules/12-world-resources-nature.js')
district = text('src/modules/14-world-district-decoration.js')
state_source = text('src/modules/02-state-save-cloud-account.js')
avatar_studio = text('src/modules/05-avatar-life-customization.js')
vehicle_fx = text('src/modules/23-vehicle-effects-driving.js')
multiplayer = text('src/modules/28-multiplayer-social-online.js')
version = json.loads(text('VERSION.json'))
manifest = json.loads(text('src/module-order.json'))

current_functions = re.findall(
    r'^  (?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(',
    app,
    re.M,
)
baseline_functions = BASELINE['orderedFunctions']
coop_source = text('src/modules/32-cooperative-missions.js')
coop_functions = set(re.findall(r'^  (?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(', coop_source, re.M))
ordered_baseline = [name for name in baseline_functions if name not in coop_functions]
ordered_current = [name for name in current_functions if name not in coop_functions]
add(
    'Funções históricas preservam a ordem, exceto o módulo cooperativo movido antes do bootstrap',
    ordered_subsequence(ordered_baseline, ordered_current),
    f"{len(baseline_functions)} base / {len(current_functions)} atuais / {len(coop_functions)} cooperativas reposicionadas",
)
add(
    'Nenhuma função V646.6 foi removida',
    set(baseline_functions).issubset(current_functions),
    f"{len(set(baseline_functions) - set(current_functions))} ausentes",
)
add(
    'Baseline reproduz a auditoria original',
    BASELINE['structuralValidation']['checks'] == 203
    and BASELINE['structuralValidation']['passed'] == 203
    and BASELINE['structuralValidation']['plainFunctions'] == 688,
)

# This is a historical-preservation test. Later releases legitimately extend
# Firebase rules, multiplayer APIs and generated CSS, so immutable binary/config
# assets are checked by hash while evolved files are checked semantically.
for relative in [
    'firebase-config.js',
    'assets/vendor/three-r128.min.js',
    'athos.glb',
]:
    expected = BASELINE['criticalFileSha256'][relative]
    add(
        f'Arquivo crítico imutável preservado: {relative}',
        sha256(relative) == expected,
        sha256(relative),
    )

rules = text('firebase-database.rules.json')
rtdb = text('assets/js/multiplayer-rtdb.js')
add(
    'Realtime Database original preservado e ampliado com segurança',
    '"otthosWorld"' in rules
    and '"admins"' in rules
    and '"gmGrants"' in rules
    and "root.child('otthosWorld')" in rules
    and 'function connect(' in rtdb
    and 'function syncProgress(' in rtdb
    and 'function gmCreateGrant(' in rtdb,
)
add(
    'Bundle CSS continua reproduzível pela arquitetura modular',
    bool(manifest.get('styles'))
    and all((ROOT / item['file']).exists() for item in manifest.get('styles', []))
    and len(text('style.css')) > 100000,
    f"{len(manifest.get('styles', []))} módulos CSS / {len(text('style.css'))} caracteres",
)

current_version = int(version.get('version') or 0)
add(
    'Fundação V646.7 preservada na versão atual',
    current_version >= 646
    and manifest.get('version') == current_version
    and manifest.get('build') == version.get('build')
    and any(
        item.get('file') == 'src/modules/00a-visual-foundation-avatar-v2.js'
        for item in manifest.get('javascript', [])
    ),
    f"V{current_version} / {version.get('build')}",
)
add(
    'Aprovação física continua pendente',
    version.get('validation', {}).get('physicalDeviceApproved') is False,
)
add(
    'Módulos JavaScript preservam a fundação e aceitam extensões posteriores',
    len(manifest.get('javascript', [])) >= 34
    and manifest['javascript'][1]['file']
    == 'src/modules/00a-visual-foundation-avatar-v2.js',
    len(manifest.get('javascript', [])),
)
cache_version = str(version.get('assetVersion', current_version * 10))
add(
    'Three.js r128 foi mantido e não há CDN',
    f'./assets/vendor/three-r128.min.js?v={cache_version}' in text('index.html')
    and 'cdnjs.cloudflare.com/ajax/libs/three.js' not in text('index.html'),
)

for token in [
    'OTTHI_VISUAL_ASSETS',
    'registerVisualAsset',
    'visualAssetStatus',
    'OTTHI_VISUAL_QUALITY_PROFILES',
    'visualFoundationDiagnostics',
]:
    add(f'Fundação visual contém {token}', token in foundation)

for token in [
    'OTTHI_AVATAR_SCHEMA_VERSION = 2',
    "renderMode: 'procedural-fallback'",
    'normalizeAvatarV2',
    'updateAvatarV2LegacyChoice',
    "root.name='OTTHI_AVATAR_ROOT'",
    "bodyRoot.name='BODY_ROOT'",
    'TOOL_SOCKET',
    'BACK_SOCKET',
    'HEAD_SOCKET',
    'VEHICLE_SOCKET',
]:
    add(f'Avatar modular preparado: {token}', token in foundation)

add(
    'Avatar antigo migra no save local e na nuvem',
    'avatar: normalizeAvatarV2' in state_source
    and 'avatar:normalizeAvatarV2' in state_source
    and '...source,' not in foundation,
)
add(
    'Estúdio atual continua usando as escolhas legadas',
    'avatarCatalog[type]' in avatar_studio
    and 'updateAvatarV2LegacyChoice' in avatar_studio
    and "avatarChoiceGroup('outfit','Roupa')" in avatar_studio,
)
add(
    'Personagem procedural continua como fallback de gameplay',
    'createAvatarRigFoundation(playerModel,bodyRoot,parts)' in render
    and re.search(
        r'function loadFaithfulAthosModel\(\)\s*\{.*?return false;',
        render,
        re.S,
    )
    is not None,
)
add(
    'athos.glb permanece registrado somente para lobby/AR',
    "purpose: 'lobby-ar-only'" in foundation
    and 'gameplayEnabled: false' in foundation,
)

add(
    'Materiais numéricos básicos passam pelo cache',
    "typeof materialOrColor === 'number' ? renderMat(materialOrColor)" in render
    and "typeof color==='number'?renderMat(color):color" in render,
)
add(
    'Geometrias e contornos possuem caches compartilhados',
    all(
        token in render
        for token in [
            'sharedGeometryCache',
            'immutableVisualMaterials',
            'outlineGeometryCache',
            'outlineMaterialCache',
        ]
    ),
)
add(
    'Descarte não destrói recursos compartilhados',
    'disposeDetachedVisual' in render
    and 'visualCacheOwnsGeometry' in render
    and 'visualCacheOwnsMaterial' in render
    and 'world.outlines.splice' in render
    and 'disposeDetachedVisual(layer)' in vehicle_fx,
)
add(
    'Materiais animados continuam exclusivos',
    'mat(0x66717d,{transparent:true,opacity:.34' in text(
        'src/modules/16-emergency-services.js'
    )
    and 'mat(color,{emissive,emissiveIntensity:.95' in vehicle_fx
    and 'carBody=box(1.72,.6,1.45,mat(color)' in multiplayer,
)

add(
    'Culling padrão reativado nas primitivas',
    render.count('mesh.frustumCulled=true') >= 2
    and 'obj.isInstancedMesh' in quality,
)
add(
    'Superfícies críticas continuam protegidas do culling',
    'function stabilizeSurface' in render
    and 'mesh.frustumCulled=false' in render
    and 'world.criticalSurfaces.includes(obj)' in quality,
)
add(
    'LOD gerenciado usa THREE.LOD',
    'const lod=new Three.LOD()' in foundation
    and 'lod.addLevel(highObject,0)' in foundation
    and 'lod.addLevel(lowObject,baseDistance)' in foundation,
)
add(
    'Árvores e rochas usam LOD real',
    nature.count('createManagedLOD(') >= 2,
    nature.count('createManagedLOD('),
)
add(
    'Árvores urbanas e prédios de fundo usam LOD real',
    district.count('createManagedLOD(') >= 2,
    district.count('createManagedLOD('),
)
add(
    'Loop visual atualiza LOD e contornos',
    'updateManagedVisualLODs(camera)' in quality
    and 'updateManagedOutlineVisibility()' in quality,
)
add(
    'Qualidade controla recursos visuais',
    'applyVisualQualityBudget(tier)' in quality
    and 'visualQualityProfile(qualityTier()).glows' in quality,
)
add(
    'Diagnóstico expõe draw calls, memória, LOD e avatar',
    all(
        token in quality
        for token in [
            'drawCalls',
            'geometries',
            'textures',
            'visual:visualFoundationDiagnostics()',
            'avatar:avatarFoundationDiagnostics()',
        ]
    ),
)

failed = [item for item in checks if not item['passed']]
report = {
    'version': int(version.get('version') or 0),
    'build': version.get('build'),
    'baseline': {
        'build': BASELINE['build'],
        'checks': BASELINE['structuralValidation']['checks'],
        'functionsIncludingAsync': len(baseline_functions),
    },
    'passed': not failed,
    'counts': {
        'checks': len(checks),
        'passed': len(checks) - len(failed),
        'failed': len(failed),
        'currentFunctionsIncludingAsync': len(current_functions),
    },
    'checks': checks,
    'limits': [
        'Teste estrutural não substitui uso em aparelho físico.',
        'Firebase remoto, multiplayer entre aparelhos, AR e APK exigem validação externa.',
    ],
}
DOCS.mkdir(exist_ok=True)
(DOCS / 'RELATORIO-PRESERVACAO-V6466-V6467.json').write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + '\n',
    encoding='utf-8',
)
markdown = [
    '# Preservação da fundação V646.6/V646.7 na versão atual',
    '',
    f"- Resultado: **{'APROVADO' if report['passed'] else 'REPROVADO'}**",
    f"- Verificações: **{report['counts']['passed']} aprovadas / {report['counts']['failed']} falhas**",
    f"- Funções-base preservadas: **{len(baseline_functions)} incluindo async**",
    f"- Funções atuais: **{len(current_functions)} incluindo async**",
    '',
    '## Verificações',
    '',
    *[
        f"- [{'x' if item['passed'] else ' '}] {item['name']}"
        + (f" — {item['detail']}" if item['detail'] else '')
        for item in checks
    ],
    '',
    '## Limites',
    '',
    *[f'- {item}' for item in report['limits']],
]
(DOCS / 'RELATORIO-PRESERVACAO-V6466-V6467.md').write_text(
    '\n'.join(markdown) + '\n',
    encoding='utf-8',
)
print(json.dumps(report, ensure_ascii=False, indent=2))
sys.exit(0 if report['passed'] else 1)

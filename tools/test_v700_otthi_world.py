#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import hashlib, json, re, sys

ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT/'docs'
checks=[]

def add(name,passed,detail=''):
    checks.append({'name':name,'passed':bool(passed),'detail':str(detail)})

def text(rel): return (ROOT/rel).read_text('utf-8')
def sha(rel): return hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()

def ordered_subsequence(expected,current):
    it=iter(current)
    return all(any(value==wanted for value in it) for wanted in expected)

version=json.loads(text('VERSION.json'))
order=json.loads(text('src/module-order.json'))
release=json.loads(text('release-manifest.json'))
assets=json.loads(text('assets/world/pbr-manifest.json'))
app=text('app.js'); style=text('style.css'); index=text('index.html'); sw=text('sw.js')
source='\n'.join(text(f'src/modules/{name}') for name in [
    '33-otthi-world-professional-core.js','34-avatar-studio-professional-v3.js',
    '35-world-render-pbr-environment.js','36-modular-build-machines.js',
    '37-hero-platform-gameplay.js','38-otthi-world-integration-bootstrap.js'])

add('Versão V700 unificada',version.get('version')==700 and version.get('build')=='700.0-five-stages-professional' and order.get('version')==700 and order.get('build')==version.get('build'))
add('Nome do novo repositório',version.get('name')=='OTTHI World' and "const repo = 'OTTHI-World'" in text('assets/js/core/runtime-config.js'))
add('40 módulos JavaScript',len(order.get('javascript',[]))==40,len(order.get('javascript',[])))
add('17 módulos CSS',len(order.get('styles',[]))==17,len(order.get('styles',[])))
add('Seis módulos profissionais ao final',[x['file'] for x in order['javascript'][-6:]]==[
    'src/modules/33-otthi-world-professional-core.js','src/modules/34-avatar-studio-professional-v3.js',
    'src/modules/35-world-render-pbr-environment.js','src/modules/36-modular-build-machines.js',
    'src/modules/37-hero-platform-gameplay.js','src/modules/38-otthi-world-integration-bootstrap.js'])
add('CSS profissional é a camada final',order['styles'][-1]['file']=='src/styles/16-otthi-world-professional-v700.css')

baseline=json.loads(text('docs/BASELINE-V6466-VISUAL-FOUNDATION.json'))
functions=re.findall(r'^  (?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(',app,re.M)
base=baseline['orderedFunctions']
add('Todas as funções-base permanecem na ordem relativa',ordered_subsequence(base,functions),f'{len(base)} base / {len(functions)} atuais')
add('Nenhuma função-base foi removida',set(base).issubset(functions),sorted(set(base)-set(functions))[:10])
add('Funções ampliadas',len(functions)>=800,len(functions))

critical={
 'firebase-config.js':'72d2fc80efc82b6df856c5b43fd9cc37990cf3fe6ea27c4d90060b4c960e56fd',
 'firebase-database.rules.json':'2e61ee7bb249d1056691dafb6f352a291f39fb39ca79880255f2d7fd11b4c79f',
 'assets/js/multiplayer-rtdb.js':'087294b5292e368ce7f8df47b2c7d75354349219a059605fa1a0cea0a514a906',
 'assets/vendor/three-r128.min.js':'9274bbcec8d96168626c732b5d31c775aa8cfb7eaa0599bec0c175908a2c1ce2',
 'athos.glb':'98c8acdbd7e4160eeb34347a3706041b50fa12d2875a03d852e3b218b7959cdb'}
for rel,expected in critical.items(): add(f'Arquivo crítico preservado: {rel}',sha(rel)==expected,sha(rel))
add('Mesmo Realtime Database e mesma raiz',"firebaseRoot: 'otthosWorld'" in text('assets/js/core/runtime-config.js') and sha('firebase-config.js')==critical['firebase-config.js'])
add('Migração do save V646 para V700',"const STORAGE_KEY = 'otthos_life_world_roleplay_v700'" in app and "'otthos_life_world_roleplay_v646'" in app)
add('Three.js r128 local preservado','./assets/vendor/three-r128.min.js?v=7000' in index and 'cdnjs.cloudflare.com/ajax/libs/three.js' not in index)

packs=assets.get('packs',{})
channels={'baseColor','normal','roughness','ao','height','emissive'}
add('26 pacotes PBR locais',len(packs)==26,len(packs))
for pack,data in packs.items():
    add(f'PBR completo {pack}',channels.issubset(data.keys()) and all((ROOT/path.removeprefix('./')).is_file() for path in data.values()))
add('157 arquivos na camada visual',len(list((ROOT/'assets/world').rglob('*.*')))==157,len(list((ROOT/'assets/world').rglob('*.*'))))

stage_tokens={
 'Etapa 1 — fundação':['OTTHI_WORLD_STAGES','applyPbrPack','otthiWorldDiagnostics','openOtthiWorldCenter'],
 'Etapa 2 — avatar':['OTTHI_WORLD_AVATAR_CATALOG','applyWorldAvatarV3','openAvatarStudioWorld','procedural-fallback'],
 'Etapa 3 — render':['createOtthiWorldProfessionalLayer','createWorldInstancedDetails','updateOtthiWorldEnvironment','upgradeCoreMaterialsToWorldPbr'],
 'Etapa 4 — máquinas':['OTTHI_WORLD_VEHICLE_CATALOG','openWorldModularGarage','applyWorldVehicleModulesToGroup','garageRack'],
 'Etapa 5 — aventura':['OTTHI_WORLD_HERO_POWERS','createWorldHeroAdventure','startWorldHeroChallenge','activateWorldHeroPower']}
for name,tokens in stage_tokens.items(): add(name,all(token in source or token in app for token in tokens),[x for x in tokens if x not in source and x not in app])
add('Novas atualizações ligadas ao game loop','updateOtthiWorldEnvironment(dt)' in text('src/modules/29-game-loop-controls-gamepad.js') and 'updateWorldHeroAdventure(dt)' in text('src/modules/29-game-loop-controls-gamepad.js'))
add('Fallback seguro no bootstrap','Camada profissional em fallback' in source and 'legacyWorldInitThree' in source and 'legacyWorldInitMaterials' in source)
add('Identidade original sem ativos de marcas',not any(token in source.lower() for token in ['minecraft','lego','playmobil','marvel','mario']))

add('Index V700 versionado',index.count('?v=7000')>=10,index.count('?v=7000'))
add('Service Worker V700',"const CACHE = `otthi-v7000-${REVISION}`" in sw and "const BUILD = '700.0-five-stages-professional'" in sw)
add('Manifesto PWA V700',json.loads(text('manifest.webmanifest')).get('name')=='OTTHI World V700')
add('Android V700',"versionCode 7000" in text('android-app/app/build.gradle') and "versionName '7.0.0'" in text('android-app/app/build.gradle'))
add('Aprovação física permanece pendente',version.get('validation',{}).get('physicalDeviceApproved') is False)

bad=[]
for rel,expected in release.get('files',{}).items():
    path=ROOT/rel
    if not path.is_file() or sha(rel)!=expected: bad.append(rel)
add('Manifesto de release coerente',release.get('version')==700 and release.get('build')==version.get('build') and release.get('algorithm')=='SHA-256')
add('Hashes de release conferem',not bad,bad)
rev_html=re.search(r'data-otthi-revision="([a-f0-9]{16})"',index)
rev_sw=re.search(r"const REVISION = '([a-f0-9]{16})';",sw)
add('Revisão PWA coerente',bool(rev_html and rev_sw) and release.get('revision')==rev_html.group(1)==rev_sw.group(1))

failed=[x for x in checks if not x['passed']]
report={'version':700,'build':version.get('build'),'passed':not failed,'counts':{'checks':len(checks),'passed':len(checks)-len(failed),'failed':len(failed),'functionsIncludingAsync':len(functions),'pbrPacks':len(packs)},'checks':checks,'limits':['Validação estática e local não substitui Android físico, Firebase remoto, multiplayer entre aparelhos, PWA instalada, AR ou APK assinado.']}
DOCS.mkdir(exist_ok=True)
(DOCS/'VALIDACAO-OTTHI-WORLD-V700.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n','utf-8')
md=['# Validação OTTHI World V700','',f"- Resultado: **{'APROVADO' if report['passed'] else 'REPROVADO'}**",f"- Verificações: **{report['counts']['passed']} aprovadas / {report['counts']['failed']} falhas**",f"- Funções incluindo async: **{len(functions)}**",f"- Pacotes PBR: **{len(packs)}**",'', '## Verificações','']+[f"- [{'x' if c['passed'] else ' '}] {c['name']}{' — '+c['detail'] if c['detail'] else ''}" for c in checks]+['','## Limites','',*['- '+x for x in report['limits']]]
(DOCS/'VALIDACAO-OTTHI-WORLD-V700.md').write_text('\n'.join(md)+'\n','utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(0 if report['passed'] else 1)

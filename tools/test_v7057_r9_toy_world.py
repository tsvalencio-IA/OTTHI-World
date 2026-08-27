#!/usr/bin/env python3
from pathlib import Path
import json, re, subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
checks=[]
def ck(name,ok,detail=''):
    checks.append({'name':name,'passed':bool(ok),'detail':str(detail)})
    print(('OK' if ok else 'FALHA')+' - '+name+(f' {detail}' if detail else ''))
def text(rel): return (ROOT/rel).read_text('utf-8')
version=json.loads(text('VERSION.json'))
layout=text('src/modules/05a-world-layout-v704.js')
npcbase=text('src/modules/13-houses-npcs-vehicles-base.js')
player=text('src/modules/11-render-materials-player-model.js')
avatar=text('src/modules/34-avatar-studio-professional-v3.js')
vehicles=text('src/modules/36-modular-build-machines.js')
world=text('src/modules/20-world-build-cloud-houses.js')
ottovias=text('src/modules/14a-ottovias-highway-v7054.js')
ck('Release R9 ou posterior',version.get('assetVersion',0)>=70579)
ck('Túnel OTTOVIAS integralmente inexistente','createOttoviasTunnel' not in ottovias and 'OTTHI_OTTOVIAS_TUNNEL' not in ottovias and 'tunnel:null' not in ottovias)
ck('Túneis de habilidade removidos do mundo','Túnel baixo' not in npcbase and "id:'mini-tunnel'" not in npcbase and "id:'crouch-tunnel'" not in npcbase)
ck('Habilidades preservadas em plataformas abertas',all(x in npcbase for x in ['skill-pad-${flag}','Desafio MINI','Desafio ABAIXAR','Desafio GRANDE']))
ck('Layout deixou de reservar túneis',"id:'mini-tunnel'" not in layout and "id:'crouch-tunnel'" not in layout)

for theme in ['lego','minecraft','playmobil','mario-world']:
    ck(f'Catálogo possui veículos {theme}',f"theme:'{theme}'" in vehicles)
for body in ['small','moto','utility','truck']:
    ck(f'Catálogo possui categoria {body}',f"bodyType:'{body}'" in vehicles)
entries=re.findall(r"Object\.freeze\(\{id:'([^']+)',label:'([^']+)'",vehicles)
ck('Catálogo possui pelo menos 16 veículos',len(entries)>=16,len(entries))
ck('Veículos comprados preservam tema e categoria','theme:parts.theme' in vehicles and 'bodyType:parts.bodyType' in vehicles and 'kind:parts.kind' in vehicles)
ck('Todo veículo civil continua utilizável','registerInteractable({id:`vehicle-${id}`' in npcbase and 'action:()=>enterVehicle(vehicle)' in npcbase)
ck('Veículo ativo troca geometria por tema/categoria','renderToyVehicleVisual' in player and 'bodyType===\'moto\'' in player and 'bodyType===\'truck\'' in player and 'bodyType===\'utility\'' in player)
ck('Veículo estacionado troca geometria por tema/categoria','normalizeVehicleBodyType' in npcbase and "theme==='playmobil'" in npcbase and "theme==='mario-world'" in npcbase)
ck('NPCs distribuem quatro estilos',all(x in npcbase for x in ["'lego'","'minecraft'","'playmobil'","'mario-world'",'toyThemeFromSeed']))
ck('Mobilidade dos NPCs respeita o estilo','const wheels=[],theme=normalizeToyTheme(npc.theme)' in npcbase)
ck('Usuário possui quatro skins selecionáveis',all(x in avatar for x in ["['lego','LEGO'","['minecraft','Minecraft / Manycraft'","['playmobil','Playmobil'","['mario-world','Mario World'"]))
ck('Skins alteram geometria e não apenas cor',all(x in avatar for x in ["avatar.bodyStyle==='minecraft'","avatar.bodyStyle==='playmobil'","avatar.bodyStyle==='mario-world'"]))
ck('Frota inicial histórica permanece com dez spawns',world.count('createToyCar(')==10,world.count('createToyCar('))
for rel in ['src/modules/05a-world-layout-v704.js','src/modules/11-render-materials-player-model.js','src/modules/13-houses-npcs-vehicles-base.js','src/modules/20-world-build-cloud-houses.js','src/modules/33-otthi-world-professional-core.js','src/modules/34-avatar-studio-professional-v3.js','src/modules/36-modular-build-machines.js']:
    r=subprocess.run(['node','--check',rel],cwd=ROOT,capture_output=True,text=True)
    ck('Sintaxe válida: '+rel,r.returncode==0,(r.stderr or '').strip())
passed=all(x['passed'] for x in checks)
print(json.dumps({'passed':passed,'counts':{'passed':sum(x['passed'] for x in checks),'failed':sum(not x['passed'] for x in checks),'total':len(checks)},'failed':[x for x in checks if not x['passed']]},ensure_ascii=False,indent=2))
sys.exit(0 if passed else 1)

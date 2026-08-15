#!/usr/bin/env python3
from pathlib import Path
import json,re,sys,math
ROOT=Path(__file__).resolve().parents[1]
def text(p): return (ROOT/p).read_text('utf-8')
checks=[]
def ck(name,ok,detail=''): checks.append((name,bool(ok),detail)); print(('OK' if ok else 'FALHA'),'-',name,detail)
v=json.loads(text('VERSION.json')); order=json.loads(text('src/module-order.json')); sports=text('src/modules/13a-sports-kart-v705.js'); npcbase=text('src/modules/13-houses-npcs-vehicles-base.js'); npclogic=text('src/modules/27-npc-enemies-combat-camera-action.js'); app=text('app.js')
ck('Release V705',v.get('version')==705 and v.get('build')=='705.0-playable-sports-realistic-npcs-kart')
legacy=text('src/modules/13a-sports-kart-v704.js') if (ROOT/'src/modules/13a-sports-kart-v704.js').exists() else ''; ck('Uma única fonte esportiva', 'src/modules/13a-sports-kart-v705.js' in [x['file'] for x in order['javascript']] and 'src/modules/13a-sports-kart-v704.js' not in [x['file'] for x in order['javascript']] and 'retired' in legacy)
ck('Futebol 3x3 real no contrato','home=[v705Athlete' in sports and 'away=[v705Athlete' in sports and "role==='keeper'" in sports)
ck('Futebol possui chute e passe','footballKickV704' in sports and 'v705FootballPass' in sports and "v705SetSpecial('↗️','Passe')" in sports)
ck('Futebol possui goleiros e IA de cobertura','keeperMove' in sports and 'chaser=awayField[0]' in sports)
ck('Vôlei/futevôlei 2x2','c.team=[v705Athlete' in sports and 'c.opponents=[v705Athlete' in sports)
ck('Regra de três toques','c.touches[0]>3' in sports and 'c.touches[1]>3' in sports)
ck('Levantamento contextual','v705CourtSet' in sports and 'handleActiveSportSpecialV704' in sports)
ck('Pontuação de set até 11 com dois de vantagem','c.score[side]>=11' in sports and 'Math.abs(c.score[0]-c.score[1])>=2' in sports)
ck('Kart usa spline técnica','THREE.CatmullRomCurve3' in sports and 'centripetal' in sports)
ck('Kart tem no mínimo 10 pontos de controle', sports.count('[-17,-1]')==1 and '[[16,-7]' in sports)
ck('Kart tem dez checkpoints','length:10' in sports or 'Array.from({length:10}' in sports)
ck('Kart tem grid e três adversários','for(let i=0;i<4;i++)' in sports and 'for(let i=0;i<3;i++)' in sports)
ck('Kart tem boxes, zebras e barreiras',"'BOXES'" in sports and 'curbA' in sports and 'kartBarrier' in sports)
ck('Kart penaliza fora da pista','v705TrackDistance' in sports and "Fora da pista" in sports)
ck('NPC visual arredondado','THREE.SphereGeometry(.39' in npcbase and 'THREE.CylinderGeometry(shoulder' in npcbase)
ck('NPC possui memória e estado','brain:{state:' in npcbase and 'v705NpcRemember' in npclogic)
ck('NPC percebe veículo','v705NpcVehicleThreat' in npclogic and 'closing=' in npclogic)
ck('NPC reage à buzina','player.hornUntil' in npclogic and 'Ouvi o carro' in npclogic)
ck('NPC evita vias e obstáculos','v704RoadAt' in npclogic and 'positionBlockedForPlayer' in npclogic)
ck('NPC desvia do veículo','v705NpcEvadeTarget' in npclogic and "b.state='evade'" in npclogic)
ck('Botão poder integrado a esporte',"handleActiveSportSpecialV704" in npclogic and "function firePower" in npclogic)
ck('Bundle contém V705','OTTHI_SPORTS_V705' in app and 'v705NpcVehicleThreat' in app)
# control points remain inside V704 kart reserve (center 94,-91; half extents 22,19) with margin
pts=[(16,-7),(14,-12),(6,-15),(-4,-14),(-14,-9),(-17,-1),(-13,8),(-5,13),(5,14),(14,9),(17,2)]
ck('Traçado cabe na zona reservada',all(abs(x)<=18 and abs(z)<=16 for x,z in pts),str(pts))
# points are not an ellipse repeated: radii vary materially
r=[round(math.hypot(x,z),2) for x,z in pts]
ck('Traçado não é oval matemático',max(r)-min(r)>4.0,f'raios {min(r)}..{max(r)}')
failed=[x for x in checks if not x[1]]
print(f'RESULTADO: {len(checks)-len(failed)}/{len(checks)}')
sys.exit(1 if failed else 0)

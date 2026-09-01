#!/usr/bin/env python3
from pathlib import Path
import json, subprocess, shutil, sys
ROOT=Path(__file__).resolve().parents[1]
checks=[]
def text(rel): return (ROOT/rel).read_text('utf-8')
def ck(name, ok, detail=''):
    checks.append((name,bool(ok),str(detail)))
    print(('OK' if ok else 'FALHA'),'-',name,detail)

v=json.loads(text('VERSION.json'))
layout=text('src/modules/05a-world-layout-v704.js')
houses=text('src/modules/20-world-build-cloud-houses.js')
emergency=text('src/modules/16-emergency-services.js')
coop=text('src/modules/32-cooperative-missions.js')
sports=text('src/modules/13a-sports-kart-v705.js')
vehicle=text('src/modules/23-vehicle-effects-driving.js')
camera=text('src/modules/27-npc-enemies-combat-camera-action.js')
parent=text('src/modules/08-map-parent-settings.js')
state=text('src/modules/02-state-save-cloud-account.js')
rtdb=text('assets/js/multiplayer-rtdb.js')
rules=json.loads(text('firebase-database.rules.json'))['rules']['otthosWorld']
manifest=text('android-app/app/src/main/AndroidManifest.xml')
main=text('android-app/app/src/main/java/br/com/thiaguinhosolucoes/otthos/MainActivity.java')

ck('Release R12 identificada',int(v.get('assetVersion',0))>=70590 and 'r12' in str(v.get('release','')).lower())
ck('Cache PWA usa token R12',text('index.html').count('?v=70590')>=10 and 'otthi-v70590-' in text('sw.js') and '?v=70590' in text('manifest.webmanifest'))
ck('Android sincronizado com R12',v.get('androidVersionCode')==70590 and v.get('androidVersionName')=='7.0.5.7.12' and 'versionCode 70590' in text('android-app/app/build.gradle'))

ck('Casa principal possui identidade própria por usuário','OTTHI_PERSONAL_HOME_LOTS' in layout and 'otthiHomeIdentity' in layout and 'otthiPersonalHomeLot' in layout)
ck('Pontos home/spawn/garagem são personalizados',"const personal=otthiPersonalHomeLot()" in layout and "if(id==='home')" in layout and "if(id==='spawn')" in layout and "if(id==='homeGarage')" in layout)
ck('Vegetação respeita lotes residenciais','v704PersonalHomeLotAt' in houses)
ck('Casa principal usa lote e paleta próprios','personalLot:homeLot.index' in houses and 'ownerIdentity:otthiHomeIdentity()' in houses)

ck('Bombeiro possui jato de água físico','function spawnFireTruckWaterJet' in emergency and 'sharedCylinderGeometry(.075,len,8)' in emergency and 'MeshStandardMaterial' in emergency[emergency.find('function spawnFireTruckWaterJet'):emergency.find('function usePlayerFireTruckWaterCannon')])
ck('Canhão do caminhão integra missão cooperativa',"window.OTTHI_COOP?.applyFireWater" in emergency and 'applyFireWater:applyCoopFireTruckWater' in coop)
ck('Missão bombeiro progride pelo canhão',"coopAddCounter('water-cannon',1,4,3)" in coop and "coopRecordEvent('fire-controlled'" in coop)
ck('Paramédico possui paciente e maca físicos',all(x in coop for x in ['createCoopParamedicProps','updateCoopParamedicProps','removeCoopParamedicProps']))
ck('Pescaria solo recebe provisão segura',all(x in coop for x in ['provisionCoopFishingGear','restoreCoopFishingGear','active.coopFishingGear']))
ck('NPC de missão ignora motoristas e papéis fixos','function coopNpcEligible' in coop and '!npc.mobility' in coop and '!npc.ottoviasRole' in coop)
ck('Solo cooperativo inicia diretamente',"if(!remote&&record.mode==='solo')return await startActiveCoopMission(true);" in coop)

ck('Esportes possuem câmera contextual','function v705SportCameraFrame' in sports and 'cameraFrame:v705SportCameraFrame' in sports and 'OTTHI_SPORTS_V705?.cameraFrame' in camera)
ck('Atletismo usa batching/instancing','OTTHI_ATHLETICS_TRACK' in sports and 'v705BatchBoxes(trackSegments' in sports)
ck('Kart usa batching/instancing','OTTHI_KART_ASPHALT' in sports and 'v705BatchBoxes(roadItems' in sports)
ck('Kart IA não ganha volta fantasma','lap:-1' in sports)
ck('Kart possui colisão jogador × CPU','contact<1.55' in sports and 'player.car.speed*=.72' in sports)
ck('Kart dirigido possui visual próprio',"if(kind==='kart')" in vehicle and 'helmet' in vehicle and 'visor' in vehicle)
ck('Vôlei e futevôlei usam quadras/rede próprias','w=foot?10:12,d=18' in sports and 'const netH=foot?2.0:2.25' in sports)

ck('Estado preserva false dos responsáveis','multiplayerEnabled:(saved.guardian?.multiplayerEnabled??fresh.guardian.multiplayerEnabled)!==false' in state)
ck('Gameplay honra multiplayer parental','function guardianMultiplayerAllowed(){return state.guardian?.multiplayerEnabled!==false;}' in text('src/modules/28-multiplayer-social-online.js'))
ck('Backend honra controles parentais','function multiplayerAllowed(){return parentalControls.multiplayerEnabled!==false}' in rtdb and 'function chatAllowed(){return communicationAllowed()&&parentalControls.chatEnabled!==false}' in rtdb)
ck('Área dos responsáveis possui toggles reais','data-guardian-toggle="multiplayerEnabled"' in parent and 'data-guardian-toggle="communicationEnabled"' in parent and 'data-guardian-toggle="chatEnabled"' in parent)

room=rules['rooms']['$roomId']; users=rules['users']['$uid']
ck('Chat exige autoria Firebase',"senderUid').val() === auth.uid" in room['chat']['$messageId']['.write'])
ck('Casas Firebase não podem ser roubadas',"ownerUid').val() === auth.uid" in room['houses']['$houseId']['.write'] and "data.child('ownerUid').val() === auth.uid" in room['houses']['$houseId']['.write'])
ck('Game session restrita aos participantes','fromUid' in room['gameSessions']['$sessionId']['.write'] and 'toUid' in room['gameSessions']['$sessionId']['.write'])
ck('Coop Firebase restrita ao host/participantes','hostUid' in room['coopMissions']['$missionId']['.write'] and 'participants' in room['coopMissions']['$missionId']['progress']['.write'])
ck('Controles parentais validados no Firebase',all(x in users['guardianSettings']['.validate'] for x in ['multiplayerEnabled','communicationEnabled','chatEnabled','isBoolean']))

ck('Android não solicita microfone','RECORD_AUDIO' not in manifest and 'RESOURCE_AUDIO_CAPTURE' not in main)
ck('Android desativa backup','android:allowBackup="false"' in manifest)

node=shutil.which('node')
for rel in ['src/modules/05a-world-layout-v704.js','src/modules/20-world-build-cloud-houses.js','src/modules/16-emergency-services.js','src/modules/23-vehicle-effects-driving.js','src/modules/27-npc-enemies-combat-camera-action.js','src/modules/28-multiplayer-social-online.js','src/modules/32-cooperative-missions.js','src/modules/13a-sports-kart-v705.js','assets/js/multiplayer-rtdb.js','app.js']:
    ok=False
    if node:
        ok=subprocess.run([node,'--check',str(ROOT/rel)],capture_output=True,text=True).returncode==0
    ck(f'Sintaxe válida: {rel}',ok)

failed=[x for x in checks if not x[1]]
print(f'RESULTADO R12: {len(checks)-len(failed)}/{len(checks)}')
if failed:
    print('FALHAS:',[x[0] for x in failed])
sys.exit(1 if failed else 0)

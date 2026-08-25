#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
checks = []


def read(relative):
    return (ROOT / relative).read_text('utf-8')


def check(name, condition, detail=''):
    checks.append({'name': name, 'passed': bool(condition), 'detail': str(detail)})
    print(('OK' if condition else 'FALHA'), '-', name, detail)


version = json.loads(read('VERSION.json'))
layout = read('src/modules/05a-world-layout-v704.js')
ottovias = read('src/modules/14a-ottovias-highway-v7054.js')
traffic = read('src/modules/07-navigation-traffic-routes.js')
resources = read('src/modules/12-world-resources-nature.js')
police = read('src/modules/16-emergency-services.js')
action = read('src/modules/27-npc-enemies-combat-camera-action.js')
android = read('android-app/app/src/main/AndroidManifest.xml')

check('Release R3 da OTTOVIAS', version.get('assetVersion') == 70573 and version.get('release') == '705.7-ottovias-flow-r3')
check('Android responde ao sensor completo', 'android:screenOrientation="fullSensor"' in android)

for token in ['vehicleOnly:true', 'getActionLabel:()=>ottoviasTollActionLabel', 'handleOttoviasTollAction', 'payOttoviasToll', 'raiseOttoviasTollGate']:
    check(f'Fluxo contextual do pedágio: {token}', token in ottovias)
check('Interação veicular tem prioridade sobre sair do carro', 'if(!it.vehicleOnly' in action and 'if(vehicleAction)return vehicleAction' in action)
check('Botão contextual aceita rótulo dinâmico', "typeof next.getActionLabel==='function'" in action and 'span.textContent=actionLabel' in action)
check('Pagamento não levanta a cancela automaticamente', 'toll.paymentPending=true' in ottovias and 'Agora toque LEVANTAR' in ottovias)
check('Cancela só abre na ação de levantar', 'function raiseOttoviasTollGate' in ottovias and 'toll.openUntil=Date.now()+14000' in ottovias)
check('Passagem autorizada consome o pagamento', 'data.passes++' in ottovias and 'toll.paymentPending=false' in ottovias)

for token in ['updateOttoviasTollPassage', 'registerOttoviasTollPassage', 'startTollEvasionPursuit', "reason:'toll-evasion'", 'movePolicePursuit', 'applyTollEvasionFine', 'Multa registrada']:
    check(f'Evasão, perseguição e multa: {token}', token in ottovias or token in police)
check('Viatura persegue usando a malha viária', 'buildRoutePoints({x:car.group.position.x' in police and 'car.group.userData.roadPath=car.pursuitRoute' in police)
check('Abordagem espera a aproximação da viatura', 'now-alert.slowSince>1100&&distance<8' in police)

for token in ['createOttoviasTunnel', 'TÚNEL OTTOVIAS', 'MANTENHA A FAIXA', 'ottoviasTunnel']:
    check(f'Túnel rodoviário profissional: {token}', token in ottovias or token in layout)
check('Pedras são proibidas na pista e acostamento', "v704HighwayAt(x,z,Math.max(1.4,scale*1.15),true)" in resources and 'clearOttoviasRoadRocks' in ottovias)
for token in ['createOttoviasPedestrianBridge', 'registerPlatform', 'PASSARELA', 'ottoviasFootbridge', 'bridgePedestrians']:
    check(f'Passarela suspensa funcional: {token}', token in ottovias or token in layout)

check('Frota autônoma OTTOVIAS criada', 'createOttoviasTrafficFlow' in ottovias and "['carga',counter,19" in ottovias)
check('Frota usa duas faixas e dois sentidos', 'ottoviasLaneRoute(h.points,2.45,false)' in ottovias and 'ottoviasLaneRoute(h.points,2.45,true)' in ottovias)
check('Frota respeita trânsito e autoridade de faixa', 'trafficSpeedFactor(vehicle,heading,8.5)' in ottovias and 'snapTrafficToRoad(vehicle.group,previous)' in ottovias)
check('Frota integra colisões e telemetria', 'world.ottoviasTraffic' in traffic and 'world.ottoviasTraffic=OTTOVIAS_RUNTIME.traffic' in ottovias)
check('Frota aplica culling para celular', 'vehicle.group.visible=Math.hypot' in ottovias and '<118' in ottovias)

check('Foto real da Michelle ausente', not (ROOT / 'assets/images/michelle-profile.png').exists() and 'michelle-profile.png' not in ottovias)
for relative in ['src/modules/14a-ottovias-highway-v7054.js', 'src/modules/16-emergency-services.js', 'src/modules/27-npc-enemies-combat-camera-action.js']:
    result = subprocess.run(['node', '--check', relative], cwd=ROOT, capture_output=True, text=True)
    check(f'Sintaxe válida: {relative}', result.returncode == 0, result.stderr.strip())

failed = [item for item in checks if not item['passed']]
print(json.dumps({'passed': not failed, 'counts': {'passed': len(checks)-len(failed), 'failed': len(failed), 'total': len(checks)}, 'failed': failed}, ensure_ascii=False, indent=2))
sys.exit(1 if failed else 0)

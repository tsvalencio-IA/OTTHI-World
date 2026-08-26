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
defaults = read('src/modules/01-build-persistence.js')
state = read('src/modules/02-state-save-cloud-account.js')
base = read('src/modules/13-houses-npcs-vehicles-base.js')
world = read('src/modules/20-world-build-cloud-houses.js')
workshop = read('src/modules/21-interactions-shop-social-races.js')
quality = read('src/modules/09-responsive-ar-quality-diagnostics.js')
garage = read('src/modules/36-modular-build-machines.js')
repair = read('src/modules/36a-vehicle-damage-repair-v704.js')

check('Release R7 ou posterior preserva garagem e oficina', version.get('assetVersion', 0) >= 70577 and bool(version.get('validation', {}).get('playerGarageStaticApproved')))
check('Android R7 ou posterior sincronizado', version.get('androidVersionCode', 0) >= 70577 and str(version.get('androidVersionName', '')).startswith('7.0.5.7.'))
check('Garagem residencial declarada no layout', all(token in layout for token in ["homeGarage:{x:-31,z:46}", "id:'home-garage'", "id:'garagem-residencial'"]))
check('Garagem residencial entra na auditoria protegida', "kind:'garage'" in layout and "structure.kind==='garage'&&owned" in layout)
check('Veículo inicial pertence ao jogador', "owned:['garage-orange']" in defaults and "primaryId:'garage-orange'" in defaults)
check('Garagem possui três estruturas persistentes', all(token in defaults + state for token in ['slots:', 'stored:', 'purchasedAt:']))
check('Save antigo migra o veículo inicial para a garagem', 'legacyVehicleSave' in state and "parkedVehicles['garage-orange']={x:-30.5,z:43.2" in state)
check('Propriedade da frota sincroniza com a nuvem', 'owned:[...(state.vehicles?.owned||[])]' in state and 'Array.isArray(remote.vehicles?.owned)' in state)
check('Porta da oficina possui prioridade máxima própria', "workshopDoor?480" in base and "label:workshopDoor?'Entrar na Oficina'" in base)
check('Oficina entra diretamente pelo fluxo de interior', "if(house.id==='workshop')return enterHouse(house)" in world)
check('Vaga de reparo não disputa a porta', "worldLayoutPoint('repairParking'" in repair and "priority:225" in repair and "z:w.z+4.8" not in repair)
check('Bancada interna abre Minha Garagem', 'data-player-garage' in workshop and 'openPlayerGarage' in workshop)
check('Garagem física foi construída no mundo', all(token in garage for token in ['createPlayerGarageWorld', 'OTTHI_PLAYER_HOME_GARAGE', 'player-home-garage', 'MINHA GARAGEM']))
check('Garagem oferece guardar e retirar', all(token in garage for token in ['storeOwnedVehicle', 'placeOwnedVehicleInGarage', 'Retirar', 'Trazer para garagem']))
check('Garagem oferece compra persistente', all(token in garage for token in ['buyPlayerVehicle', 'Comprar veículo', 'purchasedAt[id]=Date.now()']))
check('Garagem permite veículo principal', 'setPrimaryPlayerVehicle' in garage and 'data-garage-primary' in garage)
check('Garagem integra personalização e reparo', 'data-garage-customize' in garage and 'openWorldModularGarage' in garage and 'repairVehicleV704' in garage)
check('Garagem aparece no mapa e GPS', "id:'my-garage'" in garage and "setWaypoint('my-garage')" in garage)
check('Catálogo contém dez veículos civis', garage.count("Object.freeze({id:") >= 10, garage.count("Object.freeze({id:"))
for vehicle_id in ['city-white', 'adventure-black', 'country-brown']:
    check(f'Novo veículo criado: {vehicle_id}', vehicle_id in world and vehicle_id in garage)
check('Mundo materializa dez veículos civis', world.count('createToyCar(') == 10, world.count('createToyCar('))
check('Veículos guardados não oferecem interação', 'garageStored' in base and 'group.visible=!garageStored' in base)
check('Frota distante possui culling', 'updateParkedVehicleVisibility' in garage and "qualityTier()==='low'?48" in garage and 'updateParkedVehicleVisibility' in quality)
check('Veículo ocupado não é reativado pelo culling', 'vehicle.occupied||player.vehicle&&player.car.id===vehicle.id' in garage)

for relative in [
    'src/modules/01-build-persistence.js',
    'src/modules/02-state-save-cloud-account.js',
    'src/modules/05a-world-layout-v704.js',
    'src/modules/09-responsive-ar-quality-diagnostics.js',
    'src/modules/13-houses-npcs-vehicles-base.js',
    'src/modules/20-world-build-cloud-houses.js',
    'src/modules/21-interactions-shop-social-races.js',
    'src/modules/33-otthi-world-professional-core.js',
    'src/modules/36-modular-build-machines.js',
    'src/modules/36a-vehicle-damage-repair-v704.js',
]:
    result = subprocess.run(['node', '--check', relative], cwd=ROOT, capture_output=True, text=True)
    check(f'Sintaxe válida: {relative}', result.returncode == 0, result.stderr.strip())

failed = [item for item in checks if not item['passed']]
print(json.dumps({'passed': not failed, 'counts': {'passed': len(checks) - len(failed), 'failed': len(failed), 'total': len(checks)}, 'failed': failed}, ensure_ascii=False, indent=2))
sys.exit(1 if failed else 0)

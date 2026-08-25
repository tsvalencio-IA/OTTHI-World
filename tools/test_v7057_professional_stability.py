#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
checks = []


def read(relative):
    return (ROOT / relative).read_text('utf-8')


def check(name, condition):
    checks.append((name, bool(condition)))
    print(('OK' if condition else 'FALHA'), '-', name)


version = json.loads(read('VERSION.json'))
layout = read('src/modules/05a-world-layout-v704.js')
traffic = read('src/modules/07-navigation-traffic-routes.js')
npcs = read('src/modules/13-houses-npcs-vehicles-base.js')
buses = read('src/modules/15-transit-bus-metro.js')
emergency = read('src/modules/16-emergency-services.js')
orientation = read('src/modules/29-game-loop-controls-gamepad.js') + read('src/modules/30-pause-tests-public-api-bootstrap.js')
android = read('android-app/app/src/main/AndroidManifest.xml')
android_activity = read('android-app/app/src/main/java/br/com/thiaguinhosolucoes/otthos/MainActivity.java')
android_gradle = read('android-app/app/build.gradle')
michelle = read('src/modules/14a-ottovias-highway-v7054.js')
styles = read('src/styles/19-mobile-landscape-authority-v7051.css')
quick_ui = read('index.html') + read('src/modules/01-build-persistence.js') + read('src/modules/08-map-parent-settings.js')
performance = read('src/modules/09-responsive-ar-quality-diagnostics.js') + read('src/modules/29-game-loop-controls-gamepad.js')
sw = read('sw.js')

check('Release V705.7 R2 ou posterior', version.get('hotfix') == '705.7' and int(version.get('assetVersion', 0)) >= 70572 and str(version.get('release', '')).startswith('705.7-'))
check('Android usa sensor completo', 'android:screenOrientation="fullSensor"' in android)
check('Entrada solicita paisagem com fallback', "orientation.lock('landscape')" in orientation and '.finally(()=>startGame' in orientation)
check('Android força atualização do WebView ao girar', 'onConfigurationChanged(Configuration newConfig)' in android_activity and 'refreshGameViewport()' in android_activity)
check('Versão Android sincronizada', f"versionCode {version.get('androidVersionCode')}" in android_gradle and f'versionName "{version.get("androidVersionName")}"' in android_gradle)
check('Placa considera largura física', 'signHalfWidth=2.9' in layout)
check('Placa comum busca posição segura', 'function v704SafeSignPoint' in layout and 'v704RoadAt(sample.x,sample.z,.38,true)' in layout)
check('Placas usam registro e visibilidade por distância', 'navigationSigns' in performance and 'world.navigationSigns.push' in read('src/modules/12-world-resources-nature.js'))
check('Tráfego corrige para rota mesmo dentro da rua', 'for(const actor of actors)snapTrafficToRoad' in traffic and 'trafficCorridor' in traffic)
check('Tráfego usa grade espacial', 'trafficSpatialCells' in traffic and 'function nearbyTrafficActors' in traffic)
check('Rotas motorizadas seguem o grafo viário', 'function buildTrafficRoute' in traffic and 'buildTrafficRoute(route.map' in npcs and 'route=buildTrafficRoute(route,true)' in emergency)
check('NPCs motorizados recebem rota de faixa', 'npc.group.userData.roadPath=projected' in npcs)
check('Ônibus usam autoridade de faixa', 'snapTrafficToRoad(bus.group,previous)' in buses and 'g.userData.trafficCorridor=.95' in buses)
check('Emergência publica rota para correção', 'vehicle.group.userData.roadPath=vehicle.serviceRoute' in emergency)
check('Noticiário possui modos', all(token in michelle for token in ["newsMode='critical'", "newsMode==='all'", "newsMode==='silent'"]))
check('Noticiário reduz frequência e spam', 'newsCheckAt<1600' in michelle and 'lastBroadcastAt<cooldown' in michelle and 'lastTrafficBulletinAt>120000' in michelle)
check('Seletor do noticiário atualiza todos os botões', "$$('[data-michelle-news-mode]',root).forEach" in michelle)
check('Noticiário possui atalho direto', 'id="newsQuickBtn"' in quick_ui and 'openNews' in quick_ui and 'openNews:openOttoviasNews' in michelle)
check('Avatar do card é ficcional', 'Avatar estilizado da Michelle' in michelle and '.michelle-avatar-face' in styles)
check('Foto real ausente', not (ROOT / 'assets/images/michelle-profile.png').exists() and 'michelle-profile.png' not in michelle and 'michelle-profile.png' not in sw)
check('Render móvel possui teto adaptativo', 'function targetRenderFrameRate' in performance and 'perf.renderAcc' in performance and 'renderedFrames' in performance)
check('Plano escolar existe', (ROOT / 'PLANO-PROFISSIONAL-OTTHI-EDU-MUNDO-ABERTO.md').is_file())
check('Bundle JavaScript válido', subprocess.run(['node', '--check', 'app.js'], cwd=ROOT, capture_output=True).returncode == 0)

failed = [name for name, passed in checks if not passed]
print(json.dumps({'passed': not failed, 'counts': {'passed': len(checks)-len(failed), 'failed': len(failed), 'total': len(checks)}, 'failed': failed}, ensure_ascii=False, indent=2))
sys.exit(1 if failed else 0)

#!/usr/bin/env python3
from pathlib import Path
import json, sys
ROOT=Path(__file__).resolve().parents[1]
order=json.loads((ROOT/'src/module-order.json').read_text('utf-8'))
app=(ROOT/'app.js').read_text('utf-8')
index=(ROOT/'index.html').read_text('utf-8')
sw=(ROOT/'sw.js').read_text('utf-8')
files=[item['file'] for item in order['javascript']]
checks=[]
def ck(name, ok, detail=''):
    checks.append((name,bool(ok),detail))
    print(('OK' if ok else 'FALHA'),'-',name,detail)
coop='src/modules/32-cooperative-missions.js'
render='src/modules/25-render-init-resize-position-collision.js'
bootstrap='src/modules/30-pause-tests-public-api-bootstrap.js'
ck('Módulo cooperativo antes do render', files.index(coop)<files.index(render), f'{files.index(coop)+1} < {files.index(render)+1}')
ck('Módulo cooperativo antes do bootstrap', files.index(coop)<files.index(bootstrap), f'{files.index(coop)+1} < {files.index(bootstrap)+1}')
coop_marker=app.find('// ===== MODULE: 32-cooperative-missions.js =====')
render_marker=app.find('// ===== MODULE: 25-render-init-resize-position-collision.js =====')
bootstrap_marker=app.find('// ===== MODULE: 30-pause-tests-public-api-bootstrap.js =====')
decl=app.find('let coopRemoteMissions={},coopActionInteractable=null')
init=app.find('function initThree()')
ck('Bundle cooperativo antes do render', 0<=coop_marker<render_marker, f'{coop_marker} < {render_marker}')
ck('Bundle cooperativo antes do bootstrap', 0<=coop_marker<bootstrap_marker, f'{coop_marker} < {bootstrap_marker}')
ck('Declaração inicializada antes de initThree', 0<=decl<init, f'{decl} < {init}')
ck('Chamada cooperativa preservada', 'createCooperativeMissionWorld();' in app)
ck('Build atual coerente', order.get('build')=='704.0-world-reconstruction-complete' and '704.0-world-reconstruction-complete' in index and "704.0-world-reconstruction-complete" in sw)
ck('Cache atual 7040', index.count('?v=7040')>=10 and 'otthi-v7040-${REVISION}' in sw)
failed=[name for name,ok,_ in checks if not ok]
print(f'RESULTADO: {len(checks)-len(failed)}/{len(checks)}')
sys.exit(1 if failed else 0)

#!/usr/bin/env python3
from pathlib import Path
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
checks = []


def check(name, condition, detail=''):
    checks.append({'name': name, 'passed': bool(condition), 'detail': str(detail)})
    print(('OK' if condition else 'FALHA'), '-', name, detail)


def read(relative):
    return (ROOT / relative).read_text('utf-8')


source = read('src/modules/14a-ottovias-highway-v7054.js')
defaults = read('src/modules/01-build-persistence.js')
persistence = read('src/modules/02-state-save-cloud-account.js')
styles = read('src/styles/19-mobile-landscape-authority-v7051.css')
app = read('app.js')
bundle_css = read('style.css')
order = json.loads(read('src/module-order.json'))

module_path = 'src/modules/14a-ottovias-highway-v7054.js'
module_record = next((item for item in order['javascript'] if item['file'] == module_path), None)
body = source.split('// @otthi-module-body', 1)[1].lstrip('\r\n')

check('Módulo ativo da OTTOVIAS continua único', [item['file'] for item in order['javascript']].count(module_path) == 1)
check('Hash modular da Michelle corresponde ao fonte', module_record and module_record['sha256Body'] == hashlib.sha256(body.encode()).hexdigest())
check('Bundle JavaScript contém uma única implementação do relatório', app.count('function michelleCurrentReport') == 1, app.count('function michelleCurrentReport'))
check('Michelle continua sendo uma única NPC', source.count("createNPC('michelle-ottovias','Michelle'") == 1)
check('Interação original é reaproveitada', "world.interactables.find(it=>it.id==='npc-michelle-ottovias')" in source)
check('Nenhuma segunda ação da Michelle foi registrada', 'registerInteractable({id:`michelle' not in source)

for token in ['world.activeIncident', 'world.fires', 'trafficActorList', 'OTTOVIAS_RUNTIME.tolls', 'state.cityServices']:
    check(f'Telemetria lê o runtime real: {token}', token in source)
check('Relatório não busca notícias externas', 'fetch(' not in source and 'XMLHttpRequest' not in source and 'WebSocket' not in source)
check('Observador tem limite de frequência', 'newsCheckAt<1600' in source)
check('Notícias têm deduplicação', 'data.news.some(item=>item.key===dedupe)' in source)
check('Histórico é limitado para não crescer sem controle', 'OTTOVIAS_NEWS_LIMIT=16' in source and 'slice(0,OTTOVIAS_NEWS_LIMIT)' in source)
check('Abertura de acidente gera notícia', 'incident-open:' in source and "michelleAddNews('accident'" in source)
check('Encerramento de acidente gera liberação', 'incident-clear:' in source and 'Via liberada após atendimento' in source)
check('Abertura e encerramento de incêndio são observados', 'fire-open:' in source and 'fire-clear:' in source)
check('Pagamento real de pedágio gera registro', 'lastTollAt' in source and "michelleAddNews('toll'" in source)
check('Retenção e normalização do trânsito são observadas', 'Retenção prolongada' in source and 'Fluxo normalizado' in source)

for subject in ['acidente', 'incendio', 'pedagio', 'transito', 'missao', 'otto', 'noticia', 'mapa']:
    check(f'Conversa entende assunto: {subject}', subject in source)
check('Campo aceita pergunta por botão e Enter', 'data-michelle-ask' in source and "event.key==='Enter'" in source)
check('Conversa compacta separa conversa e notícias em abas', all(token in source for token in ['data-michelle-tab-button="conversation"', 'data-michelle-tab-button="news"', 'data-michelle-pane="news"', 'activateTab=id']))
check('Botões da conversa usam as classes visuais do jogo', source.count('class="btn michelle-chip"') == 4 and 'class="btn primary" data-michelle-ask' in source)
check('Resposta usa região ao vivo do jogador', 'currentBiome' in source and 'ottoviasNearestInfo(player.x,player.z)' in source)
check('Voz em português é opcional e tem fallback', "utterance.lang='pt-BR'" in source and 'Voz não disponível neste aparelho' in source)
check('API pública permite diagnóstico sem alterar mundo', all(token in source for token in ['liveReport:michelleCurrentReport', 'news:()=>', 'askMichelle:michelleAnswer']))

for token in ['roupa-preta-oculos', 'TorusGeometry', 'bun.position', 'eyebrow.rotation', 'michelleVisual', 'updateMichelleOttovias']:
    check(f'Skin e presença visual: {token}', token in source)
check('Características-base da Michelle foram preservadas', all(token in source for token in ['0xa66f50', '0x24160f', 'cabelos-cacheados', 'assessora-comunicacao-ottovias']))
check('Foto real não integra o jogo', not (ROOT / 'assets/images/michelle-profile.png').exists() and 'assets/images/michelle-profile.png' not in source)
check('Nome temporário do upload não vazou no repositório', '0e9c36e9-020f-4ff0-9c01-85ae2255f91a' not in '\n'.join(str(p) for p in ROOT.rglob('*')))
check('Marcador flutuante genérico foi removido da Michelle', 'if(npc.badge)npc.badge.visible=false' in source and 'action.label=\'Michelle • OTTOVIAS\'' in source)
check('Michelle passa a olhar para o jogador próximo', 'npc.stationaryHeading=lerpAngle' in source and 'Math.atan2(player.x-npc.group.position.x' in source)

check('Estado padrão inclui comunicação e notícias', all(token in defaults for token in ['questionsAnswered:0', 'news:[]', 'lastBulletinAt:0']))
check('Normalização limita notícias antigas', 'saved.ottovias.news.slice(0,16)' in persistence)
check('Cloud save leva comunicação e notícias', 'communication:{...(state.ottovias?.communication||{})}' in persistence and 'news:[...(state.ottovias?.news||[])].slice(0,16)' in persistence)
check('Cloud merge recupera comunicação e notícias', 'remote.ottovias?.communication' in persistence and 'remote.ottovias.news.slice(0,16)' in persistence)

for token in ['.michelle-console', '.michelle-live-report', '.michelle-quick-questions', '.michelle-news-list', '@keyframes michelle-pulse']:
    check(f'Interface responsiva: {token}', token in styles and token in bundle_css)
check('Interface tem adaptação para celular', '@media(max-width:420px)' in styles and 'orientation:landscape' in styles)
check('Contraste dos botões foi definido explicitamente', all(token in styles for token in ['.michelle-chip', 'background:#123e55!important', 'color:#fff!important', 'opacity:1!important']))
check('Modal da Michelle possui limite próprio de tela', '.modal-card:has(.michelle-console)' in styles and 'max-height:78dvh!important' in styles)
check('Abas ocultam apenas o painel inativo', '.michelle-pane[hidden]{display:none!important}' in styles)

node = subprocess.run(['node', '--check', 'app.js'], cwd=ROOT, text=True, capture_output=True)
check('Bundle final passa no parser JavaScript', node.returncode == 0, node.stderr.strip())

failed = [item for item in checks if not item['passed']]
print(json.dumps({'passed': not failed, 'counts': {'passed': len(checks)-len(failed), 'failed': len(failed), 'total': len(checks)}, 'failed': failed}, ensure_ascii=False, indent=2))
sys.exit(1 if failed else 0)

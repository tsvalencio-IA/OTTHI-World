from pathlib import Path
import re, sys
root=Path(__file__).resolve().parents[1]
sports=(root/'src/modules/13a-sports-kart-v705.js').read_text()
css=(root/'src/styles/19-mobile-landscape-authority-v7051.css').read_text()
jobs=(root/'src/modules/21-interactions-shop-social-races.js').read_text()
careers=(root/'src/modules/22-careers-jobs-uniforms.js').read_text()
damage=(root/'src/modules/36a-vehicle-damage-repair-v704.js').read_text()
checks={
 'futebol chutar':"label:'Chutar'" in sports,
 'futebol correr':"label:'Correr'" in sports,
 'futebol tocar':"label:'Tocar'" in sports,
 'futebol carrinho':"label:'Carrinho'" in sports and 'v705FootballTackle' in sports,
 'volei bloquear':"label:'Bloquear'" in sports,
 'volei cortar':"label:'Cortar'" in sports,
 'futevolei erguer':"label:'Erguer'" in sports,
 'futevolei cabecar':"label:'Cabecear'" in sports,
 'kart acelerar':"label:'Acelerar'" in sports,
 'kart frear':"label:'Frear'" in sports,
 'kart largada 3 voltas':'k.countdown=3.4' in sports and 'k.lap>=3' in sports,
 'dock esportivo':'.sport-action-dock' in css,
 'hub contraste escuro':'.sports-hub-grid button{' in css and 'color:#fff!important' in css,
 'fonte primaria legivel':'primary-actions .round span{font-size:10px!important' in css,
 'fonte quick legivel':'quick-bar button span{font-size:10px!important' in css,
 'policia acao explicita':'performPoliceCheckpointAction' in careers and 'Abordagem segura' in careers,
 'policia nao auto conclui':'job.progress=(job.progress||0)+1' in careers and 'policeCheckpointReady' in careers,
 'professor 3 etapas':'Aula prática • etapa ${step+1}/3' in careers,
 'mecanico real':'Mecânico da Oficina' in jobs and 'reparo real na bancada' in jobs,
 'mecanico completa via reparo':'mechanic-training-repair' in damage and 'mechanicRepairCompleted=true' in damage,
 'mecanico nao coleta madeira':"if(job.id==='gather')return[{text:'Coletar 3 madeiras'" not in careers,
}
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(('OK  ' if v else 'FAIL'),k)
print(f'RESULTADO: {len(checks)-len(failed)}/{len(checks)}')
if failed: sys.exit(1)

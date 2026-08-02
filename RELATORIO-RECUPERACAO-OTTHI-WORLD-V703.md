# Relatório de recuperação — OTTHI World V703

## 1. Decisão técnica

A Revisão 8 não foi usada como base para novas correções. A origem da regressão era arquitetural: novos sistemas de cenário, terreno, zonas, esporte e navegação foram materializados simultaneamente com estruturas anteriores. Testes baseados apenas em listas declarativas de coordenadas não representavam todos os objetos realmente criados na cena.

A V703 foi reconstruída sobre a **V702.1 completa**, identificada como a última consolidação funcional anterior às Revisões 7 e 8.

- Arquivo-base: `OTTHI-World-V702.1-COMPLETO-CORRIGIDO.zip`
- SHA-256 da base: `90b3e8d0ec96bc12c1d9334cdca34d65e721919b6453cadf5f7dd4c38433397c`
- Estratégia: restauração da base funcional + correções isoladas e verificáveis
- Sistemas removidos silenciosamente: nenhum
- Arquivos da base apagados: nenhum

## 2. Recuperação do mundo

Onze módulos que materializam o mundo foram restaurados exatamente da V702.1. O teste V703 compara os arquivos por SHA-256:

| Módulo | SHA-256 restaurado |
|---|---|
| `07-navigation-traffic-routes.js` | `17d76205de178eafd0965eedbbfe1f5288970c8f7e25325251f1d12aab6188e8` |
| `12-world-resources-nature.js` | `90d4e2d98840f018e7f604ef50fceeb45e6b1eb7b5ac6a8a9c20cce655bcd14a` |
| `13-houses-npcs-vehicles-base.js` | `a25d89013f401c9947d1ac1587e6c3520fbaf276352d5b9382459c47fc4b8332` |
| `14-world-district-decoration.js` | `96c9ec5985cf4054d036cba8168021bfabc797c50f5b6765d056bbd899ddf8a6` |
| `15-transit-bus-metro.js` | `d9736d2e4110bec7ca82d421efc6bf655a2db8474357267db8264f34da2da4e9` |
| `16-emergency-services.js` | `c32e37f5dab341dbd653a429f10e7d1947eb1c5cdd25b9de3e664d60e943b0bd` |
| `17-adventures-learning-world.js` | `48398d7ad28ccc7f9056fc77b5f3b197b4cb5d8409a29f9fa3ca2e9cafb6d2ea` |
| `18-water-fishing-boats.js` | `56290ee9c27161d2e61896f4d3e0c0010602818b062e0f73794004d078158b4f` |
| `20-world-build-cloud-houses.js` | `264ad05bebad2f894db21969f30d33d057f9b57a77b32bbca5d30ea6d4302a80` |
| `31-neighborhood-world-controller.js` | `b333683bdec776fb2f011215b09cf6998d19d0eb99e4448ea24b8b66a02549d7` |
| `40-world-evolution-v702.js` | `04aae1eab744995297450cb20bd893a5811a4922d107a52b4a2147ca1d9dcc57` |

O teste também exige ausência do identificador da camada de layout da Revisão 8.

### O que essa verificação prova

Prova que os módulos centrais de materialização retornaram exatamente à base V702.1.

### O que essa verificação não prova

Não substitui inspeção visual com WebGL real. Portanto, este relatório não afirma que todo objeto do mundo foi visualmente inspecionado em um celular.

## 3. Skin correta no multiplayer

O defeito não era uma permissão de skill: era falta de sincronização visual completa. A presença transmitia posição e poucos campos, enquanto o outro aparelho criava um avatar remoto genérico.

A V703 passa a transmitir uma descrição compacta e sanitizada de:

- estilo corporal;
- tom de pele;
- rosto;
- cabelo e cor;
- torso e pernas;
- calçados;
- chapéu;
- item nas costas;
- estampa;
- cores primária e secundária;
- roupa, acessório e uniforme.

O avatar remoto é reconstruído a partir desses campos. A regra do Realtime Database também foi endurecida para que `auth.uid` escreva somente em sua própria presença.

## 4. Recuperação de queda e aprisionamento

Foi implementada uma autoridade única para último ponto seguro.

A posição segura não é atualizada durante:

- queda;
- natação;
- condução de veículo;
- barco;
- ônibus/metrô ou outro transporte;
- estado passageiro;
- interior transitório incompatível.

A recuperação automática considera:

- coordenadas não finitas;
- saída dos limites do mundo;
- altura anormal;
- personagem abaixo da altura real do terreno;
- queda profunda;
- aprisionamento em collider.

Também existe o botão **Desprender — voltar ao último ponto seguro** no menu de pausa.

## 5. Missões cooperativas

Sete modelos continuam disponíveis: bombeiros, ambulância, polícia, pescaria, escola, corrida de rua e corrida oval.

Antes de iniciar, cada missão executa uma pré-validação das dependências reais necessárias, como veículo, ocorrência, NPC, escola, água, pista e malha viária. Uma missão inconsistente não é iniciada como se estivesse funcional.

### Correções objetivas

- Corrida de rua: largada e quatro checkpoints sequenciais sobre ruas existentes.
- Adversários: percorrem a mesma polilinha viária, sem fechar a volta atravessando o mapa em diagonal.
- Chegada: adversário para ao concluir, evitando repetição infinita.
- Corrida oval: setores Sul → Oeste → Norte → Leste são obrigatórios antes de contar volta.
- Pescaria: a posição materializada da fogueira é também a posição usada por GPS e objetivo.
- Objetivo atual: etapa, instrução, métrica e alvo podem ser consultados e testados.

## 6. Compatibilidade e persistência

Foram preservados da base V702.1:

- mesmo Firebase e raiz `otthosWorld`;
- contas e autenticação;
- saves locais e em nuvem;
- painel GM V701;
- casas, interiores e personalizações;
- inventário, ferramentas e construção;
- escolas, profissões e serviços;
- transporte e veículos;
- PWA e wrapper Android.

Não houve alteração de raiz do banco. A regra de presença foi alterada, mas sem migração de estrutura persistida.

## 7. Resultado local

- Validação principal: **183/183**.
- Suítes independentes: **15/15**.
- Teste específico de recuperação V703: **50/50**.
- Funções no runtime: **873**.
- Funções obrigatórias da base preservadas: **544/544**.
- Módulos JavaScript: **42**.
- Módulos CSS: **19**.
- IDs HTML auditados: **105**.
- Build repetido de forma idempotente: aprovado.
- `app.js`, `style.css`, manifesto e fontes: sincronizados.

## 8. Limitações não encobertas

Ainda não foram aprovados nesta infraestrutura:

- visual 3D em GPU/WebGL real;
- teste em celular Android físico;
- multiplayer entre dois aparelhos reais;
- Firebase remoto com as regras efetivamente publicadas;
- desconexão e reconexão real por perda de internet;
- PWA instalada e atualizada sobre cache anterior;
- APK assinado e instalado;
- desempenho prolongado.

A V703 recupera a base anterior e corrige regressões comprovadas. Ela não é apresentada como versão comercial definitiva nem como nota 10/10.

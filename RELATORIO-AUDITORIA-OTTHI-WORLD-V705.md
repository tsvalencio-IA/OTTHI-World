# OTTHI World V705 — Auditoria e reconstrução de esportes, NPCs e kartódromo

## Base usada

A V705 foi construída sobre o pacote completo V704 já consolidado. A reconstrução não cria uma segunda camada de esportes: o módulo `13a-sports-kart-v704.js` foi aposentado do `module-order.json` e reduzido a um stub de compatibilidade; a única fonte executável é `13a-sports-kart-v705.js`, mantendo apenas os nomes públicos legados necessários à compatibilidade com chamadas existentes.

## O que o vídeo demonstrou como referência de comportamento

O vídeo enviado foi usado como referência conceitual para NPCs: percepção do ambiente, interpretação do contexto e resposta coerente. Na V705 isso foi aplicado ao comportamento, não como uma tela ou texto decorativo.

Os NPCs pedestres agora mantêm estado e memória curta, percebem aproximação do jogador e veículos, consideram direção/velocidade, reagem à buzina, procuram uma posição de evasão e evitam vias, água, hazards e colliders quando escolhem destinos de caminhada. NPCs de mobilidade continuam usando suas rotas próprias para não quebrar trânsito e profissões.

## Futebol

O futebol deixa de ser apenas bola + botão e passa a manter estado de partida:

- jogador controlado pelo usuário;
- companheiro controlado pelo jogo;
- goleiro da equipe do usuário;
- dois adversários de linha;
- goleiro adversário;
- chute pelo botão AÇÃO;
- passe pelo botão PODER;
- movimentação de apoio/cobertura;
- goleiros acompanhando a bola;
- detecção de gol;
- reposicionamento após gol;
- placar;
- cronômetro de 120 segundos;
- modo de partida local e caminho de integração online preservado.

## Vôlei e futevôlei

As duas modalidades possuem quadras separadas e estados independentes. Cada partida é 2 × 2:

- jogador + companheiro IA;
- dois adversários IA;
- saque;
- rally;
- rede com altura própria por modalidade;
- detecção de lado da quadra;
- limite de três toques por equipe;
- rebatida pelo botão AÇÃO;
- levantamento contextual pelo botão PODER;
- pontuação;
- vitória do set em 11 pontos com diferença mínima de dois;
- reinício da bola entre pontos.

O futevôlei usa parâmetros próprios de rede e trajetória, em vez de apenas renomear o vôlei.

## Kartódromo

O antigo circuito elíptico foi substituído por uma pista fechada baseada em spline `THREE.CatmullRomCurve3`, com onze pontos de controle assimétricos e aproximadamente 150 segmentos de pista.

O circuito possui:

- curvas de raios diferentes;
- largura de pista definida;
- zebras;
- barreiras;
- área de boxes;
- grid de largada;
- linha de largada/chegada;
- dez checkpoints ordenados;
- três adversários controlados pelo jogo;
- três voltas;
- progresso e classificação;
- detecção de saída da pista;
- redução de velocidade fora do traçado;
- prevenção de contagem válida de volta sem sequência de checkpoints.

O kart permanece uma atividade própria e não é apenas um carro urbano renomeado.

## NPCs visuais

A base procedural dos NPCs foi refeita para reduzir o aspecto de caixas empilhadas. O corpo principal usa cabeça arredondada, tronco cilíndrico, membros articulados, cabelo, olhos, nariz, boca, calçados e variação de proporção. Os sistemas de uniformes, papéis e NPCs temáticos existentes continuam preservados.

Isso não significa que os NPCs tenham sido transformados em humanos fotorealistas. O objetivo é um personagem estilizado coerente com o OTTHI World, com comportamento mais plausível.

## Mundo e conflitos

A autoridade de layout V704 foi preservada, incluindo suas zonas protegidas e auditoria materializada. A suíte de reconstrução V704 executada já dentro da V705 passou 46/46 verificações e confirmou, no modelo geométrico auditado:

- um único complexo esportivo;
- um único kartódromo;
- ausência de conflitos registrados no layout mestre;
- ausência do antigo anel aleatório de prédios invasores;
- proteção contra collider em área esportiva;
- migração de construções antigas conflitantes;
- login desacoplado da reserva da sala multiplayer;
- dano, quebra, reparo e reboque de veículos preservados.

## Veículos

O sistema V704 de dano foi preservado. Ele mantém durabilidade, perda de desempenho, estado quebrado, imobilização, reparo e reboque. A V705 não remove nem substitui esse fluxo ao acrescentar os esportes e os NPCs.

## Validações executadas

- build modular concluído;
- sintaxe dos módulos e bundles validada;
- `app.js` e `style.css` sincronizados com as fontes;
- 197/197 verificações estruturais aprovadas;
- 25/25 verificações específicas V705 aprovadas;
- 46/46 verificações de reconstrução do mundo V704 aprovadas dentro da V705;
- 16/16 suítes locais Python aprovadas;
- 958 funções detectadas no runtime;
- 45 módulos JavaScript;
- 19 módulos CSS.

## Limitações que não serão encobertas

Não foi possível validar nesta infraestrutura:

- renderização WebGL completa em GPU real;
- teste físico em Android;
- sensação dos controles por toque em aparelho real;
- duas sessões multiplayer em dois aparelhos reais;
- Firebase remoto de produção durante uma partida completa;
- PWA instalada e atualização de Service Worker em aparelho real;
- APK assinado.

Uma tentativa de Chromium headless não conseguiu criar um contexto WebGL no ambiente disponível. Portanto, não é correto chamar essa tentativa de teste visual 3D aprovado.

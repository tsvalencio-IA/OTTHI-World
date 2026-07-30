# Checklist técnico completo — OTTHI World Edu V644

Este checklist foi gerado sobre a fonte modular completa. Ele não declara que cada experiência física foi aprovada; separa presença no código, auditoria estática e teste obrigatório em aparelho real.

## Cobertura estática

- [x] Funções: **769**
- [x] Condições/loops capturados: **2160**
- [x] Bindings de eventos: **233**
- [x] Declarações de topo: **146**
- [x] Nós HTML: **263**
- [x] IDs HTML: **104**
- [x] Módulos JavaScript: **40**
- [x] Módulos CSS: **17**

## Módulos JavaScript

- [x] `00-runtime-foundation.js` — Runtime, utilitários, versão, storage e chaves de migração — 0 funções, 8 condições/loops, 0 eventos
- [x] `00a-visual-foundation-avatar-v2.js` — Registro central de assets, LOD gerenciado, orçamento visual e esquema de avatar V2 — 18 funções, 30 condições/loops, 0 eventos
- [x] `01-build-persistence.js` — Normalização, merge, tombstones e persistência das construções — 8 funções, 9 condições/loops, 0 eventos
- [x] `02-state-save-cloud-account.js` — Estado, save local, IndexedDB, nuvem e conta — 14 funções, 54 condições/loops, 8 eventos
- [x] `03-ui-modal-install-pwa.js` — Economia, flags, telas, modais, feedback, instalação e PWA — 14 funções, 47 condições/loops, 16 eventos
- [x] `04-education-daily-quiz.js` — Desafios diários, educação, quiz e coleção — 30 funções, 42 condições/loops, 6 eventos
- [x] `05-avatar-life-customization.js` — Avatar, roupas, uniformes, vida, moldes e ajuda — 6 funções, 3 condições/loops, 7 eventos
- [x] `06-missions-profile-hud-inventory-tools.js` — Missões, objetivos, perfil, HUD, inventário e ferramentas — 22 funções, 18 condições/loops, 4 eventos
- [x] `07-navigation-traffic-routes.js` — Rotas, trânsito, grafo, GPS e minimapa — 28 funções, 70 condições/loops, 0 eventos
- [x] `08-map-parent-settings.js` — Mapa, marcadores, waypoint, reset, ferramentas parentais e configurações — 20 funções, 57 condições/loops, 36 eventos
- [x] `09-responsive-ar-quality-diagnostics.js` — Responsividade, AR, modos, qualidade, LOD e diagnóstico — 29 funções, 80 condições/loops, 13 eventos
- [x] `10-player-skills.js` — Escala, Mini/Normal/Grande, abaixar, girar e domínio de skills — 9 funções, 28 condições/loops, 0 eventos
- [x] `11-render-materials-player-model.js` — Texturas, materiais, geometria, personagem e avatar 3D — 39 funções, 111 condições/loops, 0 eventos
- [x] `12-world-resources-nature.js` — Interações do mundo, árvores, rochas, mina, poço, ruas, água e móveis — 17 funções, 54 condições/loops, 0 eventos
- [x] `13-houses-npcs-vehicles-base.js` — Casas, interiores, NPCs, inimigos, cristais, veículos e academia — 23 funções, 72 condições/loops, 0 eventos
- [x] `14-world-district-decoration.js` — Cogumelos, portais, praça, distrito e decoração urbana — 13 funções, 6 condições/loops, 0 eventos
- [x] `15-transit-bus-metro.js` — Ônibus, rotas viárias, paradas, metrô e painel de transporte — 34 funções, 110 condições/loops, 10 eventos
- [x] `16-emergency-services.js` — Bombeiros, incêndios, polícia, ambulância, segurança e incidentes — 54 funções, 96 condições/loops, 2 eventos
- [x] `17-adventures-learning-world.js` — Castelo, aventuras, desafios e praça educacional — 10 funções, 21 condições/loops, 1 eventos
- [x] `18-water-fishing-boats.js` — Água, câmera e animação da pesca, barco e física náutica — 35 funções, 66 condições/loops, 3 eventos
- [x] `19-campfire-hunting-house-extensions.js` — Fogueira, caça, animais e ampliações de casas — 37 funções, 95 condições/loops, 7 eventos
- [x] `20-world-build-cloud-houses.js` — Construção do mundo, recursos, baús, casas em nuvem e interiores — 10 funções, 43 condições/loops, 5 eventos
- [x] `21-interactions-shop-social-races.js` — Atividades, mercado, oficina, amizades, NPCs e corridas — 14 funções, 98 condições/loops, 9 eventos
- [x] `22-careers-jobs-uniforms.js` — Carreiras, estados de missão, uniformes, professor, bombeiro e entrega — 16 funções, 76 condições/loops, 10 eventos
- [x] `23-vehicle-effects-driving.js` — Poeira, som, efeitos, controles, direção, passageiros e ponte — 16 funções, 53 condições/loops, 0 eventos
- [x] `24-construction-system.js` — Custos, propriedade, preview, validação, colocação, remoção e reconciliação — 20 funções, 69 condições/loops, 4 eventos
- [x] `25-render-init-resize-position-collision.js` — Three.js, qualidade, viewport, resize, posição segura e colisões — 19 funções, 57 condições/loops, 5 eventos
- [x] `26-input-player-physics.js` — Entrada, corrida, pulo, física do jogador/veículo e animação — 14 funções, 58 condições/loops, 0 eventos
- [x] `27-npc-enemies-combat-camera-action.js` — Sociedade NPC, inimigos, combate, câmera, contexto, ação e necessidades — 16 funções, 69 condições/loops, 0 eventos
- [x] `28-multiplayer-social-online.js` — Desafios online, social, chat, presença, fantasmas e sincronização — 53 funções, 136 condições/loops, 30 eventos
- [x] `29-game-loop-controls-gamepad.js` — Loop principal, controles, gamepad e início do jogo — 6 funções, 47 condições/loops, 20 eventos
- [x] `30-pause-tests-public-api-bootstrap.js` — Pausa, testes de veículo, API pública de auditoria e bootstrap final — 5 funções, 23 condições/loops, 6 eventos
- [x] `31-neighborhood-world-controller.js` — Bairros reais, limite de vagas, transição, casas e mapa V644 — 9 funções, 9 condições/loops, 4 eventos
- [x] `32-cooperative-missions.js` — Missões cooperativas infantis, equipes online/solo, pesca, escola e corridas — 53 funções, 146 condições/loops, 4 eventos
- [x] `33-otthi-world-professional-core.js` — Fundação OTTHI World, PBR local, diagnóstico e painel das cinco etapas — 13 funções, 22 condições/loops, 7 eventos
- [x] `34-avatar-studio-professional-v3.js` — Avatar modular V3 sobre o rig procedural preservado — 10 funções, 39 condições/loops, 5 eventos
- [x] `35-world-render-pbr-environment.js` — Mundo profissional, materiais PBR, vegetação, atmosfera e detalhes — 9 funções, 24 condições/loops, 0 eventos
- [x] `36-modular-build-machines.js` — Construção modular, oficina e veículos montáveis — 9 funções, 76 condições/loops, 5 eventos
- [x] `37-hero-platform-gameplay.js` — Poderes originais, circuito de plataforma e aventura — 16 funções, 31 condições/loops, 4 eventos
- [x] `38-otthi-world-integration-bootstrap.js` — Integração, fallbacks e bootstrap das cinco etapas — 1 funções, 7 condições/loops, 2 eventos

## Sistemas e jogabilidades preservados

- [x] Estado, migração V600–V644 e salvamento local/nuvem
- [x] Conta e autenticação Firebase
- [x] Roupas, acessórios e uniformes profissionais
- [x] Skills Mini, Normal, Grande, Abaixar e Girar
- [x] Missões, objetivos, medalhas e recompensas
- [x] Inventário, ferramentas, oficina e fundição
- [x] Mapa, GPS, waypoint, minimapa e trânsito
- [x] Casas, interiores, baús, propriedades e ampliações
- [x] Construção persistente com preview, giro, colocar, cancelar e remover
- [x] Veículos, passageiros, colisões, física, som e efeitos
- [x] Ônibus, paradas, rotas e metrô
- [x] Bombeiros, caminhões, incêndios e missões
- [x] Polícia, viaturas, patrulha, alertas e segurança
- [x] Ambulâncias e incidentes de trânsito
- [x] Pescaria, câmera, peixes, barcos e física náutica
- [x] NPCs, amizade, carona, sociedade e corridas
- [x] Inimigos, combate, poderes e aventuras
- [x] Educação: matemática, português, inglês, desafios diários e trilha adaptativa
- [x] Multiplayer, presença, fantasmas, chat controlado, desafios e bairros
- [x] PWA, atualização automática, AR e APK Android

## Testes obrigatórios antes de chamar a versão de aprovada

- [ ] Abrir lobby em 320×568, 360×640, 390×844 e 412×915
- [ ] Girar automaticamente retrato ↔ paisagem durante o jogo sem reiniciar
- [ ] Medir FPS sem auditor pesado: 30 FPS mínimo em celular básico
- [ ] Abrir todos os menus e verificar margem, escala, rolagem e fechamento
- [ ] Caminhar, correr, pular, abaixar, Mini, Normal, Grande e Girar
- [ ] Entrar/sair de carro, viatura, ambulância e caminhão de bombeiros
- [ ] Completar rota de ônibus e viagem de metrô
- [ ] Iniciar/concluir/cancelar missão e restaurar uniforme
- [ ] Construir, salvar, fechar, abrir, sincronizar e remover sem reaparecer
- [ ] Pescar em retrato e paisagem, girar câmera e visualizar peixe/boia
- [ ] Entrar/sair do barco apenas em ponto seguro
- [ ] Entrar/sair de casas e usar móveis/baú/geladeira/oficina
- [ ] Executar desafios educacionais e validar progressão adaptativa
- [ ] Abrir duas sessões Firebase no mesmo bairro e validar presença/interpolação
- [ ] Mostrar casas pelo apelido seguro e respeitar privacidade
- [ ] Instalar PWA, atualizar app.js/style.css e confirmar troca do Service Worker
- [ ] Gerar APK e testar rotação, cache, retorno do segundo plano e atualização web

## Arquivos de inventário

- `INVENTARIO-FUNCOES.csv`
- `INVENTARIO-FUNCOES.json`
- `INVENTARIO-CONDICOES.csv`
- `INVENTARIO-EVENTOS.csv`
- `INVENTARIO-VARIAVEIS-TOPO.csv`
- `INVENTARIO-NOS-HTML.csv`
- `AUDITORIA-ESTATICA-RESUMO.json`

## Auditoria profunda de condições, callbacks e dependências

- [x] Declarações de função nomeadas: **769**
- [x] Funções arrow de topo: **23**
- [x] Tokens `=>` incluindo callbacks: **1104**
- [x] Ocorrências de fluxo (`if/else/switch/case/for/while/catch/return/throw`): **4240**
- [x] Bindings de evento detalhados: **297**
- [x] Pares de dependência entre módulos: **401**

### Fluxo por tipo

- [x] `catch`: **50** ocorrências
- [x] `else`: **347** ocorrências
- [x] `for`: **386** ocorrências
- [x] `if`: **2093** ocorrências
- [x] `return`: **1340** ocorrências
- [x] `throw`: **16** ocorrências
- [x] `while`: **8** ocorrências

### Inventários profundos

- `INVENTARIO-FUNCOES-DETALHADO.csv`
- `INVENTARIO-FUNCOES-DETALHADO.json`
- `INVENTARIO-CONDICOES-DETALHADO.csv`
- `INVENTARIO-ARROW-CALLBACKS.csv`
- `INVENTARIO-EVENTOS-DETALHADO.csv`
- `INVENTARIO-CALLABLES.csv`
- `DEPENDENCIAS-MODULOS.csv`
- `AUDITORIA-PROFUNDA-RESUMO.json`
- `RELATORIO-PRESERVACAO-V642-V644.md`
- `RELATORIO-PRESERVACAO-V642-V644.json`
- `CHECKLIST-769-FUNCOES.md`
- `CHECKLIST-FLUXO-IF-ELSE-SWITCH-LOOPS.md`
- `CHECKLIST-297-EVENTOS.md`
- `CHECKLIST-263-NOS-HTML.md`
- `MATRIZ-COMPLETA-JOGABILIDADES-E-TESTES.md`

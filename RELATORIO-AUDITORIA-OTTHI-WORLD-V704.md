# Relatório de auditoria e reconstrução — OTTHI World V704

## 1. Base consolidada

A V704 foi reconstruída em uma única árvore completa a partir do estado atual do repositório `tsvalencio-IA/OTTHI-World`, branch `main`. O runtime continua sendo gerado pelas fontes modulares por `tools/build_project.py`.

Não existe ordem obrigatória de hotfixes para publicar esta versão. `app.js`, `style.css`, `src/module-order.json`, `release-manifest.json`, `index.html` e `sw.js` estão sincronizados.

## 2. Origens das regressões encontradas

1. Múltiplos módulos materializavam partes do mundo com coordenadas independentes.
2. Um anel aleatório de prédios grandes podia ocupar as bordas do complexo esportivo.
3. O ginásio legado podia concorrer com o complexo esportivo novo.
4. Saves antigos podiam recolocar construções de jogadores sobre ruas e áreas esportivas.
5. Rotas, GPS e destinos não compartilhavam uma autoridade geométrica única.
6. Bots da corrida oval usavam um raio pequeno e atravessavam o campo de futebol.
7. O sistema veicular reduzia durabilidade visual, mas não impedia a física de continuar.
8. A inicialização do mundo acessava `coopActionInteractable` antes da declaração do módulo cooperativo.
9. O login aguardava conexão e reserva de sala, fazendo erros multiplayer parecerem erro de conta.

## 3. Conflitos e correções

| Conflito encontrado | Causa | Correção aplicada | Verificação automática |
|---|---|---|---|
| Prédio na pista ou no campo | Anel aleatório e criadores concorrentes | Anel removido; skyline movido para fora dos limites; complexo esportivo único | Materialização 38/38 e auditoria das áreas esportivas |
| Prédio/objeto na quadra de vôlei | Decoração sem reserva global | Vôlei e futevôlei são volumes protegidos no layout mestre | Auditoria `volley` e `footvolley`: 0 problemas |
| Ginásio duplicado | Função antiga ainda materializava geometria | Função antiga delega a `createSportsComplexV704()` | Contagem de criação única |
| Construção salva sobre rua/esporte | Save anterior sem validação global | Migração retrocompatível para zona de construção com metadados da posição antiga | Testes de migração e proteção |
| Ônibus atravessando áreas | Segmentos fora da malha viária | Cinco rotas refeitas sobre as 11 vias oficiais | 58/58 segmentos válidos |
| GPS diferente do cenário | Constantes independentes | GPS, mapa, acessos e destinos usam `WORLD_LAYOUT_V704` | Auditoria de caminhos e destinos |
| Bot de atletismo atravessando campo | Raio oval incompatível | Bots usam raios reais da pista oval | Teste específico V704 |
| Carro explode e continua andando | Dano não bloqueava física | Integridade zero define estado quebrado, zera velocidade e bloqueia atualização física | Runtime veicular 14/14 |
| Sem forma de recuperar o carro | Ausência de fluxo pós-quebra | Modal de reboque/reparo e estação de oficina | Runtime veicular 14/14 |
| Entrada no mundo bloqueada | Ordem de módulos incorreta | Cooperativo posicionado antes de render/bootstrap | Teste de inicialização V703.1 |
| Login conectado sem entrar | Conta acoplada à sala | Autenticação retorna sucesso antes de tentar conectar a sala | Teste de desacoplamento |

## 4. Autoridade do mundo

Arquivo: `src/modules/05a-world-layout-v704.js`.

A autoridade contém:

- limites globais;
- 11 vias;
- 16 zonas;
- 27 estruturas e áreas protegidas;
- 11 caminhos de acesso;
- pontos de spawn, GPS e entradas;
- funções de colisão AABB com margens;
- validação de construção;
- auditoria estática;
- auditoria do mundo materializado no runtime.

## 5. Auditoria geométrica

Resultado estático: **APROVADO**.

- Problemas: **0**
- Vias: **11**
- Estruturas: **27**
- Zonas: **16**
- Caminhos: **11**
- Rotas de ônibus: **5**
- Segmentos de rota: **58**
- Áreas jogáveis verificadas: estádio, campo, vôlei, futevôlei, circuito de kart e boxes.

A auditoria usa largura, profundidade, caixas delimitadoras, margens e segmentos. Ela não considera apenas que os centros sejam diferentes.

## 6. Materialização do mundo

O teste `tools/test_v704_world_materialization.js` executa `buildWorld()` com instrumentação e verifica o que os módulos realmente tentam criar.

Resultado: **38/38**.

- 11 vias criadas conforme o mestre;
- 11 casas;
- 7 veículos estacionados;
- 2 volumes de água;
- 1 complexo esportivo;
- 1 kartódromo;
- 1 castelo;
- nenhum prédio, casa ou veículo dentro das áreas esportivas e do circuito.

## 7. Dano e reparo de veículos

O runtime V704 mantém integridade por ID do veículo e histórico limitado.

- impacto leve: dano reduzido;
- impacto médio/forte: dano progressivo e perda de desempenho;
- impacto destrutivo: integridade zerada;
- veículo quebrado: velocidade e vetores zerados, física de direção bloqueada;
- entrada em veículo quebrado: abre opções de reparo ou reboque;
- reparo: restaura integridade mediante moedas e materiais;
- reboque: leva o veículo para o estacionamento da oficina;
- estado salvo após dano, reparo e reboque.

Teste runtime: **14/14**.

## 8. Preservação

Foram mantidos:

- contas e autenticação;
- Firebase e raiz `otthosWorld`;
- saves locais e em nuvem;
- compatibilidade/migração de dados existentes;
- multiplayer e presença;
- painel GM;
- casas, interiores e personalizações;
- missões, profissões e escolas;
- inventário, ferramentas e construção;
- ônibus, metrô, veículos e barcos;
- pesca, natação e agricultura;
- PWA, Service Worker e wrapper Android;
- controles de toque, gamepad, retrato e paisagem.

## 9. Limitações honestas

A validação executada é local, estrutural e automatizada. Permanecem sem aprovação:

- inspeção visual completa em GPU/WebGL real;
- celular físico;
- Firebase remoto de produção;
- multiplayer entre dois aparelhos;
- PWA instalada;
- APK assinado instalado;
- teste prolongado de memória, bateria e temperatura.

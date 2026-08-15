# OTTHI World V704 — reconstrução consolidada do mundo

Esta é a versão completa consolidada do projeto atual do repositório `tsvalencio-IA/OTTHI-World`, branch `main`. Ela não depende da aplicação de hotfixes em sequência.

A publicação correta substitui integralmente os arquivos da versão anterior pelo conteúdo deste pacote. Não misture a V704 com ZIPs V702, V703, V703.1, Revisão 7 ou Revisão 8.

## O que foi reconstruído

### Mundo e coordenadas

- `WORLD_LAYOUT_V704` é a autoridade única para vias, zonas, estruturas, acessos, destinos, áreas protegidas e pontos principais.
- O anel aleatório de prédios que podia invadir pista, campo e quadras foi removido.
- O skyline decorativo permanece fora dos limites jogáveis.
- Estádio, campo de futebol, pista de atletismo, vôlei, futevôlei e kartódromo possuem zonas independentes.
- A criação antiga do ginásio não materializa outra geometria: ela delega ao único complexo V704.
- Casas, prédios funcionais, veículos estacionados, água, montanhas, castelo, fazenda e áreas de construção usam o mesmo layout.
- Construções antigas salvas em ruas ou áreas protegidas são migradas para a zona de construção, sem apagar o registro do usuário.
- Rotas de ônibus, GPS, mapa, entradas e missões usam a mesma malha de vias.

### Esportes e kart

- Futebol: partida, bola, chute, gols, placar, cronômetro, reinício, adversário e goleiro básico.
- Atletismo: pista oval protegida, setores sequenciais e corrida cooperativa na geometria real da pista.
- Vôlei e futevôlei: quadras separadas, saque, rally, rede, limites, pontuação e adversário.
- Kart: modelo próprio, boxes em ilha interna, contagem regressiva, checkpoints ordenados, voltas, adversários e penalização de atalhos.

### Veículos

- Integridade persistente por veículo.
- Batidas leves, médias, fortes e destrutivas produzem consequências diferentes.
- Perda de desempenho conforme a integridade diminui.
- Batida destrutiva quebra o veículo e zera a movimentação.
- Veículo quebrado não pode ser dirigido normalmente.
- Opções reais de reboque e reparo, com custo e consumo de materiais.
- Fragmentos visuais são limitados e descartados para não crescerem indefinidamente.

### Estabilidade preservada

- Login concluído independentemente da disponibilidade da sala multiplayer.
- Ordem de inicialização cooperativa corrigida; `coopActionInteractable` é inicializada antes da montagem do mundo.
- Firebase, raiz `otthosWorld`, saves locais e em nuvem, painel GM, casas, personalizações, profissões, escolas, inventário, construção, transporte, pesca, PWA e wrapper Android permanecem no projeto.

## Estrutura

- `src/modules/` — fontes JavaScript modulares.
- `src/styles/` — fontes CSS modulares.
- `src/module-order.json` — ordem e hashes das fontes.
- `app.js` e `style.css` — bundles gerados e sincronizados.
- `tools/` — build, auditorias e testes.
- `android-app/` — wrapper Android V7.0.5.
- `firebase-database.rules.json` — regras do Realtime Database.

## Validação local executada

- build idempotente;
- sintaxe JavaScript;
- sincronização entre fontes e bundles;
- hashes da release;
- 19 arquivos de teste aprovados;
- validador estrutural: 196 de 196 verificações;
- auditoria geométrica: 11 vias, 27 estruturas, 16 zonas e 11 caminhos;
- 5 rotas de ônibus, 58 segmentos e nenhum segmento fora da rede viária;
- seis áreas esportivas/kart auditadas sem prédio, casa ou veículo invasor;
- materialização simulada de `buildWorld()`: 38 verificações;
- runtime de dano, quebra, imobilização, reboque e reparo: 14 verificações.

## Limites declarados

Não foram declarados como aprovados:

- teste visual 3D em celular físico com WebGL real;
- Firebase remoto de produção;
- multiplayer real em dois aparelhos;
- instalação e atualização da PWA;
- APK assinado instalado em aparelho;
- desempenho prolongado em diferentes celulares.

Os relatórios V703 mantidos no pacote são históricos. A referência atual de publicação é exclusivamente a V704.

---

**Powered by thIAguinho Soluções Digitais**

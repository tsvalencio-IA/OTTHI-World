# OTTHI World — Michelle e Comunicação Viva

## Base oficial utilizada

- ZIP recebido: `OTTHI-World-main(5).zip`.
- Versão do projeto: V705.
- Hotfix/base estrutural: V705.6.
- Build preservado: `705.0-playable-sports-realistic-npcs-kart`.
- Asset version preservado: `7056`.
- Arquitetura encontrada: 47 módulos JavaScript no diretório, 46 ativos no manifesto, 20 módulos CSS e 571 arquivos antes desta intervenção.

O ZIP recebido foi a única base de código. Nenhum arquivo de V702, V703, V704 ou de outro pacote foi sobreposto ao projeto.

## O que foi implementado

### 1. Michelle visualmente refeita

A única NPC `michelle-ottovias` foi preservada e remodelada proceduralmente com base na foto real enviada:

- pele morena;
- cabelo escuro, preso e ondulado, com coque e fios soltos;
- sobrancelhas marcantes;
- sorriso amplo;
- roupa preta;
- alças de mochila;
- óculos pendurados no peito;
- movimentos discretos de cabeça e braços;
- orientação dinâmica para olhar para o jogador quando ele se aproxima.

A foto enviada e autorizada foi incluída como retrato local da Michelle dentro do painel de conversa. O nome temporário do upload não aparece no projeto. A modelagem 3D continua procedural, adequada ao estilo do mundo, sem projetar a fotografia sobre uma esfera.

### 1.1. Correção visual após teste no celular

As capturas reais em 691 × 1536 revelaram problemas que foram corrigidos nesta revisão:

- removido o marcador flutuante genérico com a letra “M”;
- reduzidos coque e volumes de cabelo que deformavam a silhueta;
- removido o crachá branco desproporcional no peito;
- Michelle passa a olhar para o jogador próximo;
- rótulo de interação reduzido para não ficar cortado;
- painel limitado a 78% da altura em celular estreito;
- conversa e notícias separadas em abas, sem excluir conteúdo;
- todos os botões receberam fundo, borda e cor de texto explícitos;
- missões foram organizadas em grade legível;
- a foto real passou a identificar a Michelle no cabeçalho.
- o retrato foi incluído nos recursos opcionais do PWA para permanecer disponível após o cache.

### 2. Boletim realmente ligado ao jogo

O painel anterior continha textos fixos sobre os biomas. Agora a Michelle consulta o estado real da partida:

- acidente ativo em `world.activeIncident`;
- incêndios ativos em `world.fires`;
- veículos em movimento e retidos via `trafficActorList()`;
- equipes de polícia, resgate e bombeiros em atendimento;
- praças de pedágio existentes e liberações ativas;
- passagens e moedas realmente registradas no sistema OTTOVIAS;
- trecho real mais próximo do jogador;
- contadores reais de acidentes e incêndios resolvidos.

Nenhuma notícia externa ou aleatória foi inventada. O boletim descreve somente acontecimentos observados nos sistemas já existentes do jogo.

### 3. Notícias persistentes da OTTOVIAS

A Michelle transforma mudanças reais do runtime em notícias:

- abertura de acidente;
- encerramento de acidente e liberação da via;
- acionamento dos bombeiros;
- incêndio controlado;
- passagem efetiva por pedágio;
- início de retenção do trânsito;
- normalização do fluxo.

As notícias:

- possuem horário;
- são deduplicadas;
- ficam limitadas às 16 mais recentes para não aumentar o save indefinidamente;
- são preservadas no save local, IndexedDB e payload de nuvem;
- aparecem no quadro “Notícias da OTTOVIAS”.

### 4. Conversa interativa

O usuário pode usar perguntas rápidas ou digitar perguntas sobre:

- trânsito;
- acidentes;
- incêndios;
- pedágios;
- notícias e boletim atual;
- localização, mapa e GPS;
- missões;
- Operação Repórter Mirim de Otto/Ottinho/Otinho.

As respostas são calculadas no momento da pergunta. Há leitura em voz PT-BR quando o navegador oferece `speechSynthesis`; quando não oferece, a resposta continua disponível por texto.

### 5. Missões preservadas

Continuam funcionando na mesma NPC e na mesma interação:

- Plantão de Comunicação;
- Volta OTTOVIAS;
- Operação Repórter Mirim para Otto, Ottinho ou Otinho;
- rotas por etapas;
- GPS;
- recompensas;
- progresso e retomada.

Não foi criada uma segunda Michelle, um segundo sistema de notícias, outra rodovia ou outra autoridade de layout.

## Sistemas que não foram alterados

Não foram modificados os módulos de:

- autoridade mundial V704;
- acidentes e serviços de emergência;
- trânsito e rotas;
- construção do mundo;
- multiplayer;
- Firebase e regras;
- autenticação e contas;
- painel GM;
- casas e interiores;
- profissões;
- esportes e kart;
- veículos e dano;
- controles mobile;
- Android wrapper.

A Michelle somente observa as APIs e estados que esses sistemas já produzem.

## Validações executadas

- Build modular: concluído.
- Parser JavaScript do bundle: aprovado.
- Teste específico Michelle/Comunicação Viva: 59/59.
- Validador estrutural geral: 207/207.
- Total de arquivos de teste executados: 24/24 sem falha.
- OTTOVIAS: 60/60.
- Precisão mundial V705.6: 81/81.
- Desempenho e recuperação V705.5: 16/16.
- Mundo jogável V705: 40/40.
- Reconstrução mundial V704: 46/46.
- Materialização do mundo: 38 verificações aprovadas.
- Permissões e botões: 60/60.
- Mobilidade determinística: 12/12.
- Runtime de veículos V704: 14 verificações aprovadas.

## Limites da validação

Os testes executados cobrem sintaxe, build, estrutura, persistência, integração, geometria e simulações automatizadas existentes. Não foi possível executar inspeção visual automatizada porque o navegador headless não estava instalado no ambiente. Também não se declara teste físico em celular, PWA instalada ou multiplayer em dois aparelhos.

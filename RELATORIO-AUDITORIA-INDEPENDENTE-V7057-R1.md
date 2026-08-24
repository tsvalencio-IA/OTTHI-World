# OTTHI WORLD V705.7 R1 — auditoria independente de jogabilidade e usabilidade

## Veredito executivo

A V705.7 recebida tinha uma boa direção e preservava o mundo existente, mas não estava pronta para ser tratada como entrega final. O teste em navegador encontrou um erro real no seletor do noticiário (`$().forEach is not a function`) e dois atalhos visíveis sem ação. A revisão independente R1 corrige essas falhas, reforça a autoridade espacial de placas e tráfego, melhora a resposta à rotação Android e reduz o custo de renderização em aparelhos móveis.

Esta revisão é uma estabilização profissional da base atual. Ela ainda não transforma, sozinha, o jogo em um produto escolar comercialmente homologado: faltam piloto em aparelhos reais, console do professor, autoria curricular, telemetria pedagógica, acessibilidade, moderação e validação LGPD.

## Correções confirmadas na R1

### Orientação e responsividade

- Android configurado como `fullSensor`, sem travar o jogo em uma orientação fixa.
- O WebView atualiza layout, viewport e evento de orientação após rotação, retorno ao aplicativo e conclusão do carregamento.
- PWA/navegador solicita paisagem ao iniciar quando a API do aparelho permite; em navegadores que não permitem o bloqueio, o layout continua responsivo.
- Teste automatizado confirmou a troca das classes de retrato para paisagem em viewport móvel.

### Placas e leitura do mundo

- Placas locais agora são um único grupo visual e usam uma posição segura calculada pela geometria do mundo.
- O algoritmo de reposicionamento amplia a busca e aplica afastamento final quando o ponto original conflita com a via.
- Todas as placas de navegação entram em um registro único e são exibidas por distância e nível de qualidade.
- No cenário de teste foram registradas 32 placas e apenas 5 ficaram visíveis perto do jogador, reduzindo poluição visual e custo de desenho.

### Tráfego e veículos

- Rotas autônomas são expandidas pela malha viária, evitando diagonais entre pontos distantes.
- Carros de polícia, NPCs motorizados, ônibus e serviços usam corredores calculados pela mesma autoridade espacial.
- A verificação considera a área ocupada pelo veículo, e não somente seu ponto central.
- Pontos terminais de ônibus foram recuados das bordas das vias; ônibus já nascem orientados para o próximo trecho.
- Teste no mundo carregado: 23 atores de tráfego, nenhum fora da área segura e nenhum afastado da rota atribuída.

### Noticiário

- Corrigido o erro JavaScript que impedia a atualização visual do modo escolhido.
- Modos disponíveis: `Só importantes`, `Todos` e `Silencioso`.
- Notícias comuns ficam no painel; alertas repetidos possuem intervalo mínimo.
- O menu rápido ganhou acesso funcional ao noticiário, e o atalho de bairros/multiplayer também foi ligado ao painel correto.
- Teste em navegador confirmou estado e botão ativo em `Todos`, painel de notícias aberto e zero erros de página.

### Michelle e privacidade visual

- Não existe arquivo de fotografia da Michelle nos assets entregues.
- O painel utiliza avatar ficcional em CSS e o mundo usa personagem procedural estilizado.
- Não há dependência de imagem real no runtime nem no cache do service worker.
- A decisão de manter o avatar procedural também reduz peso de download e uso de textura.

### Desempenho

- A simulação continua responsiva, mas o WebGL pode renderizar a 30 FPS no perfil móvel baixo, 45 FPS no perfil móvel equilibrado e 60 FPS no perfil alto/desktop.
- Placas e trechos distantes passam por descarte visual; o tráfego preserva a grade espacial já existente.
- Em emulação móvel de baixa qualidade, o sistema selecionou meta de renderização de 30 FPS e DPR 0,68.
- Isso comprova a seleção do perfil, não o desempenho de um celular físico. FPS sustentado deve ser medido em aparelhos escolares reais.

## Validação executada

| Verificação | Resultado |
|---|---:|
| Estrutura, sintaxe, contratos, bundles e hashes | 210/210 |
| Estabilização profissional R1 | 23/23 |
| Mundo carregado em navegador | 23 atores de tráfego, 0 inseguros, 0 fora de rota |
| Placas próximas ao jogador | 5 visíveis de 32 registradas |
| Retrato e paisagem responsivos | aprovado em viewport emulado |
| Noticiário e atalhos | aprovado, sem erro de página |
| Fotografia real nos assets/runtime | ausente |

Limites: não foram homologados nesta máquina um APK compilado/assinado, sensor físico Android, FPS sustentado em aparelhos reais, Firebase remoto, multiplayer entre celulares, câmera/AR, rede escolar ou PWA instalada. O projeto Android não inclui Gradle Wrapper e não havia Gradle/JDK disponível para uma compilação local.

## Como virar “Duolingo dentro de um mundo aberto”

O próximo passo não deve ser adicionar mais construções, placas ou minijogos soltos. O mundo já tem sistemas suficientes; falta um produto pedagógico que os organize.

### Loop central do aluno

1. Receber uma missão curta e contextual.
2. Ir ao local, observar pessoas e informações relevantes.
3. Aprender ou revisar uma habilidade em até poucos minutos.
4. Aplicar a habilidade para alterar algo no mundo.
5. Produzir evidência: resposta, cálculo, texto, construção, decisão ou colaboração.
6. Receber feedback imediato e oportunidade de tentar novamente.
7. Registrar domínio por competência e liberar a próxima variação.

### Arquitetura mínima do produto escolar

- **Mundo estável:** navegação clara, densidade controlada, desempenho previsível e retomada segura.
- **Motor de missões orientado a dados:** objetivo, competência, pré-requisitos, passos, rubrica, evidência, ajuda e recompensa fora do código da cena.
- **Progressão adaptativa:** domínio separado por habilidade, repetição espaçada e novas tentativas com variações.
- **Console do professor:** turmas, sessões, lançamento/pausa de missão, grupos, acompanhamento ao vivo e relatório.
- **Governança escolar:** papéis, consentimento, retenção de dados, moderação, auditoria, acessibilidade e controles de segurança.

### Vertical slice recomendada

Antes de ampliar o mapa, construir uma experiência vendável de 30 a 40 minutos para uma disciplina e uma faixa etária:

- missão de investigação com Michelle;
- coleta de fatos com três NPCs;
- organização cronológica e produção de um boletim;
- feedback e nova tentativa;
- evidência registrada por aluno;
- professor lança a atividade e acompanha início, bloqueio e conclusão.

Critérios de aceite do piloto: 90% dos alunos iniciam sem ajuda técnica, 80% concluem no tempo de aula, nenhum progresso é perdido, a sessão funciona na rede da escola e o professor identifica quem travou sem perguntar aluno por aluno.

## Roadmap recomendado

### Fase A — homologação da R1

Matriz de três Androids reais (entrada, intermediário e tablet), sessões de 20 minutos, rotação repetida, retomada após bloqueio de tela, temperatura, memória, FPS percentil 1%, rede instável e multiplayer com dois aparelhos.

### Fase B — produto pedagógico mínimo

Contrato único de missão, uma trilha curricular, evidência versionada, painel básico do professor e uma experiência vertical completa.

### Fase C — operação escolar

Autoria sem código, turmas e permissões, moderação, acessibilidade, relatórios, observabilidade, suporte e revisão jurídica/LGPD.

### Fase D — escala

Piloto controlado com uma escola, métricas de aprendizagem e retenção, correções baseadas em sessões observadas e só então expansão de disciplinas, gincanas e conteúdo.

## Decisão de entrega

Usar o ZIP completo da R1. O ZIP de arquivos alterados serve somente para comparação ou aplicação sobre a mesma V705.7 de origem. Não vender nem apresentar a escolas como produto homologado antes da Fase A e de um vertical slice pedagógico com professor.

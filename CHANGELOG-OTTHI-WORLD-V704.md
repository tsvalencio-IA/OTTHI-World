# Changelog — OTTHI World V704

## Consolidação

- Projeto completo consolidado em uma única árvore.
- Versão web `704.0-world-reconstruction-complete`.
- Android `versionCode 7040` / `versionName 7.0.4`.
- Workflows de build e APK atualizados para V704.
- Service Worker, cache, manifesto, fontes e bundles sincronizados.

## Mundo

- Nova autoridade única `WORLD_LAYOUT_V704`.
- Rede de 11 vias e acessos conectados.
- 16 zonas funcionais com limites explícitos.
- 27 estruturas/áreas protegidas.
- Remoção do anel aleatório de prédios invasores.
- Skyline decorativo deslocado para fora dos limites jogáveis.
- Água dividida em lago principal e braço norte.
- Casas, serviços, fazenda, castelo, montanha e áreas de construção reposicionados de forma coerente.
- Migração segura de construções antigas para a zona de construção quando houver conflito.

## Tráfego, mapa e GPS

- Cinco rotas de ônibus refeitas sobre a rede viária.
- 58 segmentos de rota auditados.
- Pontos de ônibus, destinos, entradas e caminhos ligados ao layout mestre.
- GPS, mapa e mundo usam as mesmas coordenadas.

## Complexo esportivo

- Único estádio e única pista de atletismo.
- Campo com linhas, áreas, círculo, gols, redes, arquibancadas, iluminação e placar.
- Futebol com partida, bola, chute, gols, cronômetro, goleiro e adversário.
- Pista oval protegida e corrida sequencial.
- Bots cooperativos corrigidos para correr sobre a pista, sem atravessar o campo.
- Vôlei e futevôlei em quadras separadas com saque, rally, limites e pontuação.

## Kartódromo

- Circuito separado da cidade.
- Karts próprios, boxes, largada, checkpoints ordenados e três voltas.
- Adversários e classificação.
- Penalização de atalhos inválidos.

## Veículos

- Integridade persistente.
- Consequências diferentes para colisões leves, médias, fortes e destrutivas.
- Perda de desempenho conforme o dano.
- Quebra total e imobilização real.
- Veículo quebrado não pode ser dirigido.
- Reboque para a oficina.
- Reparo mediante moedas e materiais.
- Fragmentos visuais limitados e descartados.

## Estabilidade

- Correção da ordem de inicialização de `coopActionInteractable`.
- Login desacoplado da reserva de sala multiplayer.
- Fontes e bundles compilados sincronizados.
- Novos testes de materialização do mundo, auditoria de rotas e runtime veicular.

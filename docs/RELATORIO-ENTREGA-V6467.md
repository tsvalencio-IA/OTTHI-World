# OTTHI World Edu V646.7 — relatório de entrega

## Escopo concluído

Foi concluída a Etapa 1 solicitada:

- auditoria direta do ZIP original;
- fundação visual modular;
- preparação do Avatar V2;
- cache seguro de materiais e contornos;
- correção do culling padrão;
- LOD real em quatro famílias de objetos;
- diagnóstico visual ampliado;
- personagem procedural preservado como fallback;
- Three.js r128 preservado;
- build, inventários, testes e pacote final atualizados.

## O que permaneceu intacto

- Firebase e regras;
- módulo de multiplayer RTDB;
- `athos.glb`;
- todo o CSS e o layout;
- física e controles;
- missões e profissões;
- casas, construção e móveis;
- veículos, barcos, ônibus e metrô;
- educação e progressão;
- recursos do mundo e coordenadas existentes.

## Resultado dos testes

| Suíte | Resultado |
|---|---:|
| Validador estrutural V646.7 | 208/208 |
| Preservação/fundação visual | 44/44 |
| Mobilidade determinística | 12/12 |
| Mundo V643 | 34/34 |
| Bairros e mapa | 87/87 |
| Permissões e botões V646.6 preservados | 60/60 |
| Testes de release | 15/15 |
| Serviços profissionais | 6/6 |
| Polimento comercial | 6/6 |
| Cooperativo e responsividade | 6/6 |

Também passaram:

- build modular;
- sintaxe de todos os módulos e bundles;
- auditoria estática e inventário profundo;
- equivalência histórica;
- harness de slots, cache 503 e revisão PWA;
- testes de multiplayer e missões.

## Métricas finais

- 34 módulos JavaScript;
- 16 módulos CSS;
- 711 funções nomeadas na auditoria estática;
- 750 funções incluindo declarações assíncronas;
- 104 IDs HTML;
- revisão de release: `15e494cd952e3289`.

## Como usar

1. Extraia o ZIP preservando todas as pastas.
2. Publique o conteúdo completo no mesmo local do projeto atual.
3. Não copie apenas `app.js`; a revisão PWA exige o conjunto completo.
4. Abra a versão com `?v=6467` ou atualize a PWA.
5. Antes de produção final, execute o checklist físico abaixo.

## Checklist físico obrigatório

- [ ] abrir em Android real em retrato e paisagem;
- [ ] entrar no mundo, caminhar, correr, pular e usar skills;
- [ ] abrir o estúdio e salvar todas as opções antigas;
- [ ] dirigir e entrar/sair de cada tipo de veículo;
- [ ] testar casas, móveis, construção, pesca, barcos, ônibus e metrô;
- [ ] concluir missões de polícia, bombeiros, resgate e educação;
- [ ] testar dois aparelhos no mesmo bairro;
- [ ] validar Firebase remoto com regras publicadas;
- [ ] instalar/atualizar a PWA;
- [ ] gerar e instalar o APK;
- [ ] registrar FPS, draw calls e memória em aparelhos básicos e intermediários.

## Estado de aprovação

`physicalDeviceApproved` permanece `false`. A entrega está aprovada pelos testes automatizados, mas não deve ser descrita como aprovada em aparelho físico até concluir o checklist acima.

# Resultados dos testes — OTTHI World V704

## Resumo

- Validador estrutural: **196/196** verificações.
- Arquivos de teste executados individualmente: **19/19 aprovados**.
- Reconstrução V704: **46/46** verificações.
- Materialização do mundo: **38/38** verificações.
- Dano/reparo veicular em runtime: **14/14** verificações.
- Mobilidade determinística: **12/12**.
- Permissões e botões: **60/60**.
- Funções no runtime compilado: **936**.
- Módulos JavaScript: **45**.
- Módulos CSS: **19**.
- Build repetido sem alterar hashes: **APROVADO**.
- Sintaxe de `app.js`, `sw.js`, módulos e scripts auxiliares: **APROVADA**.

## Arquivos de teste executados

| Teste | Resultado |
|---|---|
| `tools/test_v643_world_systems.py` | APROVADO |
| `tools/test_v644_neighborhoods.py` | APROVADO |
| `tools/test_v6462_commercial_polish.py` | APROVADO |
| `tools/test_v6463_coop_responsive.py` | APROVADO |
| `tools/test_v6467_visual_foundation.py` | APROVADO |
| `tools/test_v646_professional_services.py` | APROVADO |
| `tools/test_v646_release.py` | APROVADO |
| `tools/test_v647_multiplayer_missions.py` | APROVADO |
| `tools/test_v700_otthi_world.py` | APROVADO |
| `tools/test_v701_gm_panel.py` | APROVADO |
| `tools/test_v702_world_evolution.py` | APROVADO |
| `tools/test_v7031_startup_order.py` | APROVADO |
| `tools/test_v703_recovery.py` | APROVADO |
| `tools/test_v704_world_reconstruction.py` | APROVADO — 46/46 |
| `tools/test_v643_mobility.js` | APROVADO — 12/12 |
| `tools/test_v6466_permissions_buttons.js` | APROVADO — 60/60 |
| `tools/test_v646_runtime.js` | APROVADO |
| `tools/test_v704_vehicle_runtime.js` | APROVADO — 14/14 |
| `tools/test_v704_world_materialization.js` | APROVADO — 38/38 |

## Auditorias adicionais

### `tools/audit_world_v704.py`

- resultado: APROVADO;
- conflitos geométricos: 0;
- 11 vias;
- 27 estruturas;
- 16 zonas;
- 11 caminhos;
- 5 rotas de ônibus;
- 58 segmentos válidos;
- 6 áreas esportivas/kart sem invasores.

### `tools/validate_project.py`

- resultado: APROVADO;
- verificações: 196;
- falhas: 0;
- `app.js` e `style.css` iguais aos bundles esperados pelas fontes;
- hashes da release conferidos;
- revisão de HTML, Service Worker e release coerente.

## Separação dos tipos de teste

| Tipo | Situação |
|---|---|
| Validação estática | APROVADA |
| Testes automatizados locais | APROVADOS |
| Auditoria geométrica por volumes/margens | APROVADA |
| Materialização simulada de `buildWorld()` | APROVADA |
| Runtime isolado de dano/reparo veicular | APROVADO |
| Build idempotente | APROVADO |
| Teste visual WebGL em GPU real | NÃO EXECUTADO |
| Celular físico | NÃO EXECUTADO |
| Firebase remoto de produção | NÃO EXECUTADO |
| Multiplayer real em dois aparelhos | NÃO EXECUTADO |
| PWA instalada | NÃO EXECUTADO |
| APK assinado e instalado | NÃO EXECUTADO |

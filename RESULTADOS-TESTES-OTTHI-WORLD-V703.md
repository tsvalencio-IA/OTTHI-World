# Resultados dos testes — OTTHI World V703

## Resumo

| Camada | Resultado |
|---|---:|
| Validação estrutural principal | 183/183 |
| Suítes executadas | 15/15 |
| Recuperação V703 | 50/50 |
| Funções obrigatórias preservadas | 544/544 |
| Funções encontradas no runtime | 873 |
| Módulos JavaScript | 42 |
| Módulos CSS | 19 |
| IDs HTML auditados | 105 |
| Build idempotente | Aprovado |
| Sintaxe `app.js` | Aprovada |
| Sintaxe `sw.js` | Aprovada |
| JSON e workflows YAML | Aprovados |

## Suítes executadas

1. `tools/test_v643_mobility.js`
2. `tools/test_v643_world_systems.py`
3. `tools/test_v644_neighborhoods.py`
4. `tools/test_v6462_commercial_polish.py`
5. `tools/test_v6463_coop_responsive.py`
6. `tools/test_v6466_permissions_buttons.js` — 60/60
7. `tools/test_v6467_visual_foundation.py`
8. `tools/test_v646_professional_services.py`
9. `tools/test_v646_release.py`
10. `tools/test_v646_runtime.js`
11. `tools/test_v647_multiplayer_missions.py`
12. `tools/test_v700_otthi_world.py`
13. `tools/test_v701_gm_panel.py`
14. `tools/test_v702_world_evolution.py` — 59/59
15. `tools/test_v703_recovery.py` — 50/50

Todas retornaram código de saída zero.

## Verificações específicas da V703

- versão, cache, Android e release coerentes;
- onze módulos mundiais idênticos à V702.1 por SHA-256;
- ausência da camada de layout da Revisão 8;
- contrato completo de avatar remoto;
- sanitização do avatar no RTDB;
- escrita de presença restrita ao próprio UID;
- último ponto seguro e recuperação automática/manual;
- posições transitórias não persistidas como seguras;
- pré-validação de missões;
- objetivos com etapa, métrica, alvo e instrução;
- checkpoints reais da corrida de rua;
- bots sem rota diagonal;
- setores obrigatórios da pista oval;
- fogueira e GPS da pescaria na mesma posição.

## Classificação dos testes

### Validação estática

Aprovada para sintaxe, hashes, contratos, presença de sistemas, preservação de funções e consistência entre fontes e bundles.

### Testes automatizados locais

Aprovados nas 15 suítes listadas.

### Teste visual 3D

Não aprovado. O resultado precisa ser observado em navegador com WebGL/GPU real.

### Dispositivo físico

Não executado.

### Firebase remoto

Não executado com as regras efetivamente publicadas.

### Multiplayer real

Não executado entre dois aparelhos.

### PWA/APK

Instalação e atualização não executadas em dispositivo físico.

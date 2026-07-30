# Validação estrutural automática — OTTHI World V700

- Resultado: **APROVADO**
- Verificações: **170 aprovadas / 0 falhas**
- Funções incluindo async: **808**

## Verificações

- [x] Arquivo obrigatório index.html
- [x] Arquivo obrigatório app.js
- [x] Arquivo obrigatório style.css
- [x] Arquivo obrigatório sw.js
- [x] Arquivo obrigatório manifest.webmanifest
- [x] Arquivo obrigatório release-manifest.json
- [x] Arquivo obrigatório VERSION.json
- [x] Arquivo obrigatório firebase-config.js
- [x] Arquivo obrigatório firebase-database.rules.json
- [x] Arquivo obrigatório athos.glb
- [x] Arquivo obrigatório src/module-order.json
- [x] Arquivo obrigatório assets/world/pbr-manifest.json
- [x] Arquivo obrigatório tools/build_project.py
- [x] Arquivo obrigatório tools/test_v700_otthi_world.py
- [x] Arquivo obrigatório src/modules/33-otthi-world-professional-core.js
- [x] Arquivo obrigatório src/modules/34-avatar-studio-professional-v3.js
- [x] Arquivo obrigatório src/modules/35-world-render-pbr-environment.js
- [x] Arquivo obrigatório src/modules/36-modular-build-machines.js
- [x] Arquivo obrigatório src/modules/37-hero-platform-gameplay.js
- [x] Arquivo obrigatório src/modules/38-otthi-world-integration-bootstrap.js
- [x] Arquivo obrigatório src/styles/16-otthi-world-professional-v700.css
- [x] Arquivo obrigatório .github/workflows/build-modular-app.yml
- [x] Arquivo obrigatório .github/workflows/gerar-apk.yml
- [x] JSON VERSION.json
- [x] JSON src/module-order.json
- [x] JSON manifest.webmanifest
- [x] JSON release-manifest.json
- [x] JSON firebase-database.rules.json
- [x] JSON assets/world/pbr-manifest.json
- [x] 40 módulos JavaScript — 40
- [x] 17 módulos CSS — 17
- [x] Manifesto JS completo
- [x] Manifesto CSS completo
- [x] Ordem JS corresponde aos arquivos
- [x] Ordem CSS corresponde aos arquivos
- [x] Versão central V700
- [x] Sintaxe app.js
- [x] Sintaxe sw.js
- [x] Sintaxe src/modules/00-runtime-foundation.js
- [x] Sintaxe src/modules/00a-visual-foundation-avatar-v2.js
- [x] Sintaxe src/modules/01-build-persistence.js
- [x] Sintaxe src/modules/02-state-save-cloud-account.js
- [x] Sintaxe src/modules/03-ui-modal-install-pwa.js
- [x] Sintaxe src/modules/04-education-daily-quiz.js
- [x] Sintaxe src/modules/05-avatar-life-customization.js
- [x] Sintaxe src/modules/06-missions-profile-hud-inventory-tools.js
- [x] Sintaxe src/modules/07-navigation-traffic-routes.js
- [x] Sintaxe src/modules/08-map-parent-settings.js
- [x] Sintaxe src/modules/09-responsive-ar-quality-diagnostics.js
- [x] Sintaxe src/modules/10-player-skills.js
- [x] Sintaxe src/modules/11-render-materials-player-model.js
- [x] Sintaxe src/modules/12-world-resources-nature.js
- [x] Sintaxe src/modules/13-houses-npcs-vehicles-base.js
- [x] Sintaxe src/modules/14-world-district-decoration.js
- [x] Sintaxe src/modules/15-transit-bus-metro.js
- [x] Sintaxe src/modules/16-emergency-services.js
- [x] Sintaxe src/modules/17-adventures-learning-world.js
- [x] Sintaxe src/modules/18-water-fishing-boats.js
- [x] Sintaxe src/modules/19-campfire-hunting-house-extensions.js
- [x] Sintaxe src/modules/20-world-build-cloud-houses.js
- [x] Sintaxe src/modules/21-interactions-shop-social-races.js
- [x] Sintaxe src/modules/22-careers-jobs-uniforms.js
- [x] Sintaxe src/modules/23-vehicle-effects-driving.js
- [x] Sintaxe src/modules/24-construction-system.js
- [x] Sintaxe src/modules/25-render-init-resize-position-collision.js
- [x] Sintaxe src/modules/26-input-player-physics.js
- [x] Sintaxe src/modules/27-npc-enemies-combat-camera-action.js
- [x] Sintaxe src/modules/28-multiplayer-social-online.js
- [x] Sintaxe src/modules/29-game-loop-controls-gamepad.js
- [x] Sintaxe src/modules/30-pause-tests-public-api-bootstrap.js
- [x] Sintaxe src/modules/31-neighborhood-world-controller.js
- [x] Sintaxe src/modules/32-cooperative-missions.js
- [x] Sintaxe src/modules/33-otthi-world-professional-core.js
- [x] Sintaxe src/modules/34-avatar-studio-professional-v3.js
- [x] Sintaxe src/modules/35-world-render-pbr-environment.js
- [x] Sintaxe src/modules/36-modular-build-machines.js
- [x] Sintaxe src/modules/37-hero-platform-gameplay.js
- [x] Sintaxe src/modules/38-otthi-world-integration-bootstrap.js
- [x] Sintaxe assets/js/core/performance-guardian.js
- [x] Sintaxe assets/js/core/runtime-config.js
- [x] Sintaxe assets/js/core/safe-pointer.js
- [x] Sintaxe assets/js/core/viewport-manager.js
- [x] Sintaxe assets/js/education/adaptive-learning.js
- [x] Sintaxe assets/js/game-account.js
- [x] Sintaxe assets/js/multiplayer/room-manager.js
- [x] Sintaxe assets/js/multiplayer-rtdb.js
- [x] Sintaxe assets/js/safety/child-safety.js
- [x] Sintaxe assets/js/save-db.js
- [x] Sintaxe assets/js/ui/shared-modal.js
- [x] Mobilidade determinística — ┌─────────┬──────────────────────────────────────────────────────────┬────────────┐
│ (index) │ teste                                                    │ resultado  │
├─────────┼──────────────────────────────────────────────────────────┼────────────┤
│ 0       │ 'Carro acelera apenas pelo botão'                        │ 'APROVADO' │
│ 1       │ 'Carro: comando direita produz curva visual à direita'   │ 'APROVADO' │
│ 2       │ 'Carro: comando esquerda produz curva visual à esquerda' │ 'APROVADO' │
│ 3       │ 'Carro: curvas laterais são simétricas e opostas'        │ 'APROVADO' │
│ 4       │ 'Carro: Freio reduz a velocidade antes da ré'            │ 'APROVADO' │
│ 5       │ 'Carro: botão Freio/Ré engata ré depois de parar'        │ 'APROVADO' │
│ 6       │ 'Carro: Acelerar freia a ré e volta ao avanço'           │ 'APROVADO' │
│ 7       │ 'Barco acelera apenas pelo botão'                        │ 'APROVADO' │
│ 8       │ 'Barco: comando direita produz curva visual à direita'   │ 'APROVADO' │
│ 9       │ 'Barco: comando esquerda produz curva visual à esquerda' │ 'APROVADO' │
│ 10      │ 'Barco: Freio reduz antes da ré'                         │ 'APROVADO' │
│ 11      │ 'Barco: Freio/Ré engata ré após parar'                   │ 'APROVADO' │
└─────────┴──────────────────────────────────────────────────────────┴────────────┘
{"passed":12,"failed":0}
- [x] Sistemas do mundo preservados — tail": ""
    },
    {
      "name": "Pesca viva criada na expansão do lago",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Textura de água PNG válida",
      "passed": true,
      "detail": "(512, 512)"
    },
    {
      "name": "Textura de água usada no material",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Frota inicial limitada",
      "passed": true,
      "detail": "{'solar': 2, 'verde': 2, 'escolar': 1, 'circular': 1, 'turismo': 1}"
    },
    {
      "name": "Circular da Cidade com uma unidade",
      "passed": true,
      "detail": "1"
    },
    {
      "name": "Trânsito: trafficPriority",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: trafficSpeedFactor",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: captureTrafficPositions",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: resolveTrafficOverlaps",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: trafficHoldUntil",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: busSpawnIndex",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: buildBusRoadPath",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: recoverBusRoute",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: validateBusCoverage",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: laneOffset",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Serviços de emergência respeitam retenção",
      "passed": true,
      "detail": "3"
    },
    {
      "name": "NPCs/veículos respeitam retenção",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: mode-mobility-driver #runBtn",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: mode-mobility-driver #jumpBtn",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: orientation:portrait",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: orientation:landscape",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: mode-passenger",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Preservação: bombeiros",
      "passed": true,
      "detail": "createFireTruck,activateFireIncident"
    },
    {
      "name": "Preservação: policia",
      "passed": true,
      "detail": "createPoliceCar,startPoliceAlert"
    },
    {
      "name": "Preservação: ambulancia",
      "passed": true,
      "detail": "createAmbulance,resolveTrafficIncident"
    },
    {
      "name": "Preservação: roupas",
      "passed": true,
      "detail": "applyAvatarCustomization,JOB_UNIFORMS"
    },
    {
      "name": "Preservação: skills",
      "passed": true,
      "detail": "setScaleMode,toggleCrouch,spinPlayer"
    }
  ]
}
- [x] Bairros, mapa e salas —  },
    {
      "name": "Mapa completo mapRegionsMarkup",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Mapa completo mapHouseLocations",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Mapa completo mapLocations",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Mapa completo quadrado",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Mapa retrato responsivo",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Mapa paisagem responsivo",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Canvas minimapa acompanha caixa",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Regras possuem slots fixos",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-01",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-02",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-03",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-04",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-05",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-06",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-07",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-08",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-09",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cliente gera slot-10",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Regra não aceita numChildren",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Vaga aceita qualquer jogador autenticado",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Reserva ocorre por vaga individual",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Reserva não grava o conjunto inteiro",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Vaga sem validação bloqueadora",
      "passed": true,
      "detail": ""
    },
    {
      "name": "UI mostra ocupação",
      "passed": true,
      "detail": ""
    },
    {
      "name": "UI bloqueia lotado",
      "passed": true,
      "detail": ""
    },
    {
      "name": "UI só seleciona após sucesso",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Módulo 31 no manifesto",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS 13 no manifesto",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Versão consolidada no index",
      "passed": true,
      "detail": "16"
    },
    {
      "name": "Runtime consolidado",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Service Worker consolidado",
      "passed": true,
      "detail": ""
    }
  ]
}
- [x] Slots, PWA e revisão — V700 runtime: slots reais, fallback 503, instalação incompleta e revisão coerente aprovados.
- [x] Permissões e botões — V646.6 permissões e botões: 60/60 aprovados.
- [x] Multiplayer e missões — {
  "passed": true,
  "counts": {
    "passed": 31,
    "failed": 0,
    "total": 31
  },
  "checks": [
    {
      "name": "Navegação aguarda worldGroup",
      "passed": true
    },
    {
      "name": "Reserva atômica de sala preservada",
      "passed": true
    },
    {
      "name": "Fallback por transação individual",
      "passed": true
    },
    {
      "name": "Reserva individual testável",
      "passed": true
    },
    {
      "name": "Participante fica registrado ao desconectar",
      "passed": true
    },
    {
      "name": "Evento cooperativo idempotente",
      "passed": true
    },
    {
      "name": "Cancelamento pelo remetente",
      "passed": true
    },
    {
      "name": "Modo competitivo sincronizado",
      "passed": true
    },
    {
      "name": "Regras aceitam transação individual",
      "passed": true
    },
    {
      "name": "Convites autenticados sem bloqueio adicional",
      "passed": true
    },
    {
      "name": "Missões incluem Controlar o fogo progressivamente",
      "passed": true
    },
    {
      "name": "Missões incluem safety-release",
      "passed": true
    },
    {
      "name": "Missões incluem patient-loaded",
      "passed": true
    },
    {
      "name": "Missões incluem patient-delivered",
      "passed": true
    },
    {
      "name": "Missões incluem suspect-escorted",
      "passed": true
    },
    {
      "name": "Missões incluem student-delivered",
      "passed": true
    },
    {
      "name": "Missões incluem coopReserveEvent",
      "passed": true
    },
    {
      "name": "Missões incluem coopIndividualCount",
      "passed": true
    },
    {
      "name": "Missões incluem coopRaceStandings",
      "passed": true
    },
    {
      "name": "Missões incluem continueCoopMissionOffline",
      "passed": true
    },
    {
      "name": "Missões incluem createCoopOvalTrackWorld",
      "passed": true
    },
    {
      "name": "Maca exige dois participantes",
      "passed": true
    },
    {
      "name": "Papéis não podem exceder a capacidade",
      "passed": true
    },
    {
      "name": "Todos precisam estar prontos",
      "passed": true
    },
    {
      "name": "Bots usam posições e velocidade determinísticas",
      "passed": true
    },
    {
      "name": "Bots desaceleram perto do jogador",
      "passed": true
    },
    {
      "name": "Mapa inclui participantes online",
      "passed": true
    },
    {
      "name": "Missão ativa tem prioridade no agrupamento",
      "passed": true
    },
    {
      "name": "Mapa recalcula em resize e orientação",
      "passed": true
    },
    {
      "name": "Tela baixa tem regra dedicada",
      "passed": true
    },
    {
      "name": "Modal usa dimensões reais do aparelho",
      "passed": true
    }
  ]
}
- [x] Serviços profissionais — test_accidents_stop_and_require_all_services (__main__.ProfessionalEmergencyServicesTests.test_accidents_stop_and_require_all_services) ... ok
test_buses_and_traffic_have_collision_protection (__main__.ProfessionalEmergencyServicesTests.test_buses_and_traffic_have_collision_protection) ... ok
test_missions_require_correct_vehicle (__main__.ProfessionalEmergencyServicesTests.test_missions_require_correct_vehicle) ... ok
test_service_jobs_and_visual_uniforms_exist (__main__.ProfessionalEmergencyServicesTests.test_service_jobs_and_visual_uniforms_exist) ... ok
test_service_vehicle_visuals_are_local_and_multiplayer_safe (__main__.ProfessionalEmergencyServicesTests.test_service_vehicle_visuals_are_local_and_multiplayer_safe) ... ok
test_service_vehicles_are_distinct_enterable_and_reserved (__main__.ProfessionalEmergencyServicesTests.test_service_vehicles_are_distinct_enterable_and_reserved) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.002s

OK
- [x] Mapa, móveis e roupas — test_assigned_service_vehicle_is_real_map_target (__main__.CommercialPolishTests.test_assigned_service_vehicle_is_real_map_target) ... ok
test_map_is_dynamic_square_and_viewport_fitted (__main__.CommercialPolishTests.test_map_is_dynamic_square_and_viewport_fitted) ... ok
test_mission_card_opens_one_clear_briefing (__main__.CommercialPolishTests.test_mission_card_opens_one_clear_briefing) ... ok
test_new_style_is_last_and_build_outputs_match (__main__.CommercialPolishTests.test_new_style_is_last_and_build_outputs_match) ... ok
test_room_furniture_is_persistent_and_editable (__main__.CommercialPolishTests.test_room_furniture_is_persistent_and_editable) ... ok
test_uniforms_follow_animated_limbs (__main__.CommercialPolishTests.test_uniforms_follow_animated_limbs) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.010s

OK
- [x] Cooperativo e responsividade — test_all_requested_cooperative_missions_exist (__main__.CoopResponsiveTests.test_all_requested_cooperative_missions_exist) ... ok
test_map_is_clustered_and_responsive_in_both_orientations (__main__.CoopResponsiveTests.test_map_is_clustered_and_responsive_in_both_orientations) ... ok
test_roles_and_shared_progress_are_online (__main__.CoopResponsiveTests.test_roles_and_shared_progress_are_online) ... ok
test_school_fishing_and_race_runtime_contracts (__main__.CoopResponsiveTests.test_school_fishing_and_race_runtime_contracts) ... ok
test_state_persists_and_existing_systems_integrate (__main__.CoopResponsiveTests.test_state_persists_and_existing_systems_integrate) ... ok
test_uniform_and_build_order_are_complete (__main__.CoopResponsiveTests.test_uniform_and_build_order_are_complete) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.009s

OK
- [x] Cinco etapas OTTHI World V700 —   "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo market-floor",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo market-wall",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo school-floor",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo fire-wall",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo concrete",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo city-glass",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo emergency-metal",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo toy-plastic",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo vehicle-tire",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo hero-energy",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo mushroom",
      "passed": true,
      "detail": ""
    },
    {
      "name": "PBR completo foliage",
      "passed": true,
      "detail": ""
    },
    {
      "name": "157 arquivos na camada visual",
      "passed": true,
      "detail": "157"
    },
    {
      "name": "Etapa 1 — fundação",
      "passed": true,
      "detail": "[]"
    },
    {
      "name": "Etapa 2 — avatar",
      "passed": true,
      "detail": "[]"
    },
    {
      "name": "Etapa 3 — render",
      "passed": true,
      "detail": "[]"
    },
    {
      "name": "Etapa 4 — máquinas",
      "passed": true,
      "detail": "[]"
    },
    {
      "name": "Etapa 5 — aventura",
      "passed": true,
      "detail": "[]"
    },
    {
      "name": "Novas atualizações ligadas ao game loop",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Fallback seguro no bootstrap",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Identidade original sem ativos de marcas",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Index V700 versionado",
      "passed": true,
      "detail": "16"
    },
    {
      "name": "Service Worker V700",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Manifesto PWA V700",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Android V700",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Aprovação física permanece pendente",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Manifesto de release coerente",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Hashes de release conferem",
      "passed": true,
      "detail": "[]"
    },
    {
      "name": "Revisão PWA coerente",
      "passed": true,
      "detail": ""
    }
  ],
  "limits": [
    "Validação estática e local não substitui Android físico, Firebase remoto, multiplayer entre aparelhos, PWA instalada, AR ou APK assinado."
  ]
}
- [x] IDs HTML únicos — []
- [x] Referências locais existem — []
- [x] Cache-busting V700 — 16
- [x] Three.js local
- [x] Manifesto PWA V700
- [x] Service Worker V700
- [x] Hash-fonte src/modules/00-runtime-foundation.js — cd720661a6eeab922727156fd47996d61ef60fd766800a719f7927250cc5e37d
- [x] Hash-fonte src/modules/00a-visual-foundation-avatar-v2.js — 66e94b2cd90c68e43a7455afa3045b6449799c9710b602558166d6e5f0e03d39
- [x] Hash-fonte src/modules/01-build-persistence.js — 64d9805824f7580eeef13c6fafdf44aff265487bf727f5b4acb456b905e80d81
- [x] Hash-fonte src/modules/02-state-save-cloud-account.js — 1ec0bc156fd66ca8de527f1612bf92ae67078a292127898c53428dbf0fe65081
- [x] Hash-fonte src/modules/03-ui-modal-install-pwa.js — d49232561be91aabe54e17ae6d1e18c9699c67ee5cf1848e731cbd811b8950ff
- [x] Hash-fonte src/modules/04-education-daily-quiz.js — 28bfae12189a8bfd6118d93fdeb881fff8c23a4fc4bccd32bfa8dd9cebd2baba
- [x] Hash-fonte src/modules/05-avatar-life-customization.js — 48eee0d596cf07cfffb597d2b8c5b3a3a8423b77fa4dcee070740827f04ffdd1
- [x] Hash-fonte src/modules/06-missions-profile-hud-inventory-tools.js — 178d197114587ed9c603698409a36cd437f1b95ecd2a9e7b126d80f9c77c313b
- [x] Hash-fonte src/modules/07-navigation-traffic-routes.js — 2d042aa04eb6877c0ae464e09a866b3566a0814283cb0d4d481ce31c2a320ecc
- [x] Hash-fonte src/modules/08-map-parent-settings.js — f0c69a7ef66cebbb77b19f1d1d8e09a6f362776f70036aab0f15442d0c906a3b
- [x] Hash-fonte src/modules/09-responsive-ar-quality-diagnostics.js — afdc7b09eea815820e1182aacc91ef4dc2c97d5d3bdf7e2ace2e61b553afb74c
- [x] Hash-fonte src/modules/10-player-skills.js — aea3d85401c518ddf4cbfefffe2e0ad720ae4faf46d27310a886b4d966674715
- [x] Hash-fonte src/modules/11-render-materials-player-model.js — fd64f45cbfb038e111bdc952f5f2eeae332ac7c25708fda9c263767d333aa207
- [x] Hash-fonte src/modules/12-world-resources-nature.js — ba7ee4fe809b208029fb66b9817d56d943e227c472c5ecb9cebd65441a513bf8
- [x] Hash-fonte src/modules/13-houses-npcs-vehicles-base.js — e4aca2245b2704c140cdae177332129e5b25365e5d69f9a3e4f3b49361907976
- [x] Hash-fonte src/modules/14-world-district-decoration.js — b134bf487383f09375cf4967dd2107b2a3051750c3267f6227b4fff511bde87e
- [x] Hash-fonte src/modules/15-transit-bus-metro.js — f31250d84ed4d69dfad67a2c4bccd41eceecf88efba217ac907237972c34656c
- [x] Hash-fonte src/modules/16-emergency-services.js — 05ca8dc1c1d2ff6acd0c0f913e232f7e92fa076b95b819ae64bd8bab41e28d51
- [x] Hash-fonte src/modules/17-adventures-learning-world.js — 735b30a5f026eb52467df35c61c3d5e4af5c73d7bdc879581d1070c18d07a201
- [x] Hash-fonte src/modules/18-water-fishing-boats.js — 4c9c1581d29146594327bfbc15acb7643bd715f85c1a35f32dc1032a86e19afb
- [x] Hash-fonte src/modules/19-campfire-hunting-house-extensions.js — 6ea68178a5f6831171335b9c20dd59b6d8985ba0cc1ff587ab95b4ab1d44e977
- [x] Hash-fonte src/modules/20-world-build-cloud-houses.js — 712fcc110bd8927592ba637c22f8c81b4ab42f6ba5d1d1863f5e2ad3978e21b9
- [x] Hash-fonte src/modules/21-interactions-shop-social-races.js — 8350f48f0306b34a20fa2a13eec7e48e88724dd06524117896d97dfe64176b8e
- [x] Hash-fonte src/modules/22-careers-jobs-uniforms.js — 5b8ccea7fe11dfd5bb6c050c6706dbecea3e5f8bf36ec666cf4baa6a7bf0e169
- [x] Hash-fonte src/modules/23-vehicle-effects-driving.js — e9310ba6bc960c093e1bc1950ff75998bc8ccb8f4ac6db9589a2f696fd8c3e75
- [x] Hash-fonte src/modules/24-construction-system.js — ecbecef3564a5d94f76ffd3d537aa25ad451c20514d64d05f6dca5519768ab48
- [x] Hash-fonte src/modules/25-render-init-resize-position-collision.js — 530244db62e871e89f980499a3898a09034eac47ab606ad03877f1ee28542c12
- [x] Hash-fonte src/modules/26-input-player-physics.js — 9ac178393a9f2f438bc629e0b980681ee21e4c98adbd6ba476ffc3e9649bc5f7
- [x] Hash-fonte src/modules/27-npc-enemies-combat-camera-action.js — e93543bd683176e6db4f61bb1e30723964b945757c79df0d22b2099f51547f58
- [x] Hash-fonte src/modules/28-multiplayer-social-online.js — 3044b224e20adb290b944c1aef9043539475dc184d9d5b70708949c0ffc58014
- [x] Hash-fonte src/modules/29-game-loop-controls-gamepad.js — 9671825c0b7600bd99b597ad62cb3736928e99d28f27b8134ec709fdab26ff4d
- [x] Hash-fonte src/modules/30-pause-tests-public-api-bootstrap.js — 8539dc76be417801be7672f65d3fe20108b13c402059ad777197920e5c604802
- [x] Hash-fonte src/modules/31-neighborhood-world-controller.js — c077d7777f196bc9dc03bc62dd3f73c9c15e8f8b5222cff0b94c926d78058ba7
- [x] Hash-fonte src/modules/32-cooperative-missions.js — 71dfedd7b855a95d8047d514c54f013fcb65de6de5e45cdb82f2a78fccf22a0f
- [x] Hash-fonte src/modules/33-otthi-world-professional-core.js — 3a533b234dcc7e85f0bbee1abe3fe8a52d6ac276e261869c7f8fc64aa3579e55
- [x] Hash-fonte src/modules/34-avatar-studio-professional-v3.js — 756ec5ef4c5dc016dce652a80d4bc896c768ab214b0412470f092b7dc60870dd
- [x] Hash-fonte src/modules/35-world-render-pbr-environment.js — 9738993dc27cc6b48be41fb05e2e5e036a1495559a8b02470ec3b3fbe0c25e68
- [x] Hash-fonte src/modules/36-modular-build-machines.js — e7727cf5ff9311e925701d6581c950bd6cf53211beaedf5d2ca65e0ac63c405c
- [x] Hash-fonte src/modules/37-hero-platform-gameplay.js — a4e83de8cef4f4be7e4467c6c56446feb2fb3edc75246fb2bc296556db60402a
- [x] Hash-fonte src/modules/38-otthi-world-integration-bootstrap.js — 1099058c7c4a347b346dfe36b2119a314ca8b8acfe765155b291c65467bf6493
- [x] Hash-fonte src/styles/00-foundation-lobby-game-modal.css — ff7d8c3bf3169c75f4299c794fa9e874665a16a220ee1c4e6dbba19ee41759b8
- [x] Hash-fonte src/styles/01-legacy-v607-v613.css — 4bcd18c1b61afa8822aca9c4ba3e7a5d77165544d4bd49faa06ba3650d35815e
- [x] Hash-fonte src/styles/02-art-direction-v614-v617.css — c0f3710d71a87fb0d9f4b9e9cb0c9bac130a7522eb76bfa3a65634616236d666
- [x] Hash-fonte src/styles/03-responsive-social-v618-v623.css — 9bcad1abea60e6fbfa8aae53b4fcb579bc86b2c03f4d49ed65115f2c5c6bc10c
- [x] Hash-fonte src/styles/04-map-v624-v627.css — aa03c40f2feb1022e26a87f8f796a1dba7c94d3d9b63569aaec9edf6b5fa94bb
- [x] Hash-fonte src/styles/05-world-ui-v628-v631.css — d86fd4ed14be0a50f354aab3abc7b95673aeeab32faae3cba9f3f4dde1dd814b
- [x] Hash-fonte src/styles/06-install-build-v633-v636.css — fc9ec2784b052bfe5cae58cf29409a65e1d653c9b5c222156299648a580417b0
- [x] Hash-fonte src/styles/07-display-fishing-v637.css — bbbdccf84a35f2dc43606dfdf2e8921433c646c88ee4ca081d6f5941709b7a4f
- [x] Hash-fonte src/styles/08-construction-v638.css — 862e2964d6181b5f75f1e49d64216ff335a2ebcba1e0596ead6400061431fd30
- [x] Hash-fonte src/styles/09-gameplay-layout-camera-v640.css — d16c924b27e60a067d022437b46154f635e678de6052662e22f28a5ec77c1b5c
- [x] Hash-fonte src/styles/10-foundation-rooms-learning-v641-v642.css — f71f620f0e2e25835cc7f196627e8f2bdc35680fe16356e32dde598b6484f0f7
- [x] Hash-fonte src/styles/11-mobility-traffic-fishing-v643.css — 387201cfc25ccbc5df444932ac206d7c3e285c321da48f72007cbc09db40051e
- [x] Hash-fonte src/styles/12-fullscreen-responsive-hotfix-v6431.css — 36407f245dfd26972ef43b1c92dcf1f91d4f66f945e2946c627a36bd80fac7fd
- [x] Hash-fonte src/styles/13-neighborhood-world-map-v644.css — b9b6f6d86986f46d2be48800eec8b34375a96d1305a5a4ee99f5799c0b7d3262
- [x] Hash-fonte src/styles/14-commercial-responsive-map-missions-furniture.css — 01dc21a785a5a037029c6ed631524dbb01ad520fc3e2ca93d114345386551835
- [x] Hash-fonte src/styles/15-coop-map-responsive-v6463.css — 4e81741e689020453cb0cdd6d0740184a9a7804d6e5d8b7f0226a9cf9b0a722b
- [x] Hash-fonte src/styles/16-otthi-world-professional-v700.css — 5a61b5fba611631b0839e2a76ab84e34398705b46d079000a85a101751758466
- [x] app.js sincronizado com fontes
- [x] style.css sincronizado com fontes
- [x] Funções preservadas e ampliadas — 808
- [x] Release V700 coerente
- [x] Hashes da release conferem — []
- [x] Revisão HTML/SW/manifesto coerente
- [x] Firebase remoto ainda não declarado aprovado
- [x] Dispositivo físico ainda não declarado aprovado

## Limites

- Não substitui teste em Android físico, Firebase remoto, multiplayer entre dois aparelhos, PWA instalada, AR ou APK assinado.

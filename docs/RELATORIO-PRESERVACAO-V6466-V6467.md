# Preservação da fundação V646.6/V646.7 na versão atual

- Resultado: **APROVADO**
- Verificações: **43 aprovadas / 0 falhas**
- Funções-base preservadas: **727 incluindo async**
- Funções atuais: **936 incluindo async**

## Verificações

- [x] Funções históricas preservam a ordem, exceto o módulo cooperativo movido antes do bootstrap — 727 base / 936 atuais / 71 cooperativas reposicionadas
- [x] Nenhuma função V646.6 foi removida — 0 ausentes
- [x] Baseline reproduz a auditoria original
- [x] Arquivo crítico imutável preservado: firebase-config.js — 72d2fc80efc82b6df856c5b43fd9cc37990cf3fe6ea27c4d90060b4c960e56fd
- [x] Arquivo crítico imutável preservado: assets/vendor/three-r128.min.js — 9274bbcec8d96168626c732b5d31c775aa8cfb7eaa0599bec0c175908a2c1ce2
- [x] Arquivo crítico imutável preservado: athos.glb — 98c8acdbd7e4160eeb34347a3706041b50fa12d2875a03d852e3b218b7959cdb
- [x] Realtime Database original preservado e ampliado com segurança
- [x] Bundle CSS continua reproduzível pela arquitetura modular — 19 módulos CSS / 223366 caracteres
- [x] Fundação V646.7 preservada na versão atual — V704 / 704.0-world-reconstruction-complete
- [x] Aprovação física continua pendente
- [x] Módulos JavaScript preservam a fundação e aceitam extensões posteriores — 45
- [x] Three.js r128 foi mantido e não há CDN
- [x] Fundação visual contém OTTHI_VISUAL_ASSETS
- [x] Fundação visual contém registerVisualAsset
- [x] Fundação visual contém visualAssetStatus
- [x] Fundação visual contém OTTHI_VISUAL_QUALITY_PROFILES
- [x] Fundação visual contém visualFoundationDiagnostics
- [x] Avatar modular preparado: OTTHI_AVATAR_SCHEMA_VERSION = 2
- [x] Avatar modular preparado: renderMode: 'procedural-fallback'
- [x] Avatar modular preparado: normalizeAvatarV2
- [x] Avatar modular preparado: updateAvatarV2LegacyChoice
- [x] Avatar modular preparado: root.name='OTTHI_AVATAR_ROOT'
- [x] Avatar modular preparado: bodyRoot.name='BODY_ROOT'
- [x] Avatar modular preparado: TOOL_SOCKET
- [x] Avatar modular preparado: BACK_SOCKET
- [x] Avatar modular preparado: HEAD_SOCKET
- [x] Avatar modular preparado: VEHICLE_SOCKET
- [x] Avatar antigo migra no save local e na nuvem
- [x] Estúdio atual continua usando as escolhas legadas
- [x] Personagem procedural continua como fallback de gameplay
- [x] athos.glb permanece registrado somente para lobby/AR
- [x] Materiais numéricos básicos passam pelo cache
- [x] Geometrias e contornos possuem caches compartilhados
- [x] Descarte não destrói recursos compartilhados
- [x] Materiais animados continuam exclusivos
- [x] Culling padrão reativado nas primitivas
- [x] Superfícies críticas continuam protegidas do culling
- [x] LOD gerenciado usa THREE.LOD
- [x] Árvores e rochas usam LOD real — 2
- [x] Árvores urbanas e prédios de fundo usam LOD real — 2
- [x] Loop visual atualiza LOD e contornos
- [x] Qualidade controla recursos visuais
- [x] Diagnóstico expõe draw calls, memória, LOD e avatar

## Limites

- Teste estrutural não substitui uso em aparelho físico.
- Firebase remoto, multiplayer entre aparelhos, AR e APK exigem validação externa.

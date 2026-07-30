# Auditoria técnica e implementação da Etapa 1 — V646.7

Data da verificação: 29 de julho de 2026.

## Resultado

A auditoria apresentada para o ZIP foi confrontada diretamente com o pacote original. Os pontos centrais estavam corretos. A V646.7 implementa a fundação visual e a preparação do Avatar V2 sem substituir o personagem jogável, sem atualizar o Three.js e sem alterar Firebase, regras, multiplayer, física, missões ou layout.

## Base original verificada

| Item | Resultado direto |
|---|---:|
| Módulos JavaScript | 33 |
| Módulos CSS | 16 |
| Funções nomeadas na auditoria original | 688 |
| Funções incluindo declarações assíncronas | 727 |
| IDs HTML | 104 |
| Validador estrutural original | 203/203 |
| `physicalDeviceApproved` | `false` |

Foram identificados no código mundo aberto, bairros, casas, veículos, profissões, construção, multiplayer, missões, educação, qualidade automática, materiais padrão do Three.js e texturas locais.

## Verificação do personagem

O personagem usado na partida é procedural. O método `loadFaithfulAthosModel()` continua retornando `false` e documenta que `athos.glb` pertence ao visualizador/AR do lobby.

O catálogo antigo foi confirmado:

- 4 roupas;
- 3 chapéus mais a opção “nenhum”;
- 3 acessórios mais a opção “nenhum”;
- 9 uniformes profissionais mais a opção “nenhum”.

### Inspeção direta de `athos.glb`

| Propriedade | Resultado |
|---|---:|
| Tamanho | 4.304.412 bytes |
| Vértices | 8.889 |
| Triângulos | 12.690 |
| Malhas principais | 1 |
| Skins/esqueletos | 0 |
| Animações | 0 |
| Texturas incorporadas | 3 |
| Maior textura | 4096 × 4096 |
| Gerador | Tripo |

Conclusão: o GLB não é um substituto direto e animado para o personagem da partida.

## Gargalos confirmados

| Ponto auditado | Situação encontrada na V646.6 | Tratamento V646.7 |
|---|---|---|
| `frustumCulled = false` nas primitivas | Confirmado em `box()` e `cylinder()` | Primitivas comuns voltaram ao culling; superfícies críticas e instâncias distribuídas foram protegidas |
| “LOD” sem troca de modelo | Confirmado | Criado LOD real de dois níveis com `THREE.LOD` |
| Materiais iguais recriados | Confirmado nas cores numéricas | `box()` e `cylinder()` passam pelo cache de materiais imutáveis |
| Contorno por objeto | Confirmado em `premiumBox()` | Geometrias e materiais de linha agora são compartilhados e limitados por distância |
| Objetos repetidos | `InstancedMesh` já existia em grama/flores | Mantido; lotes foram protegidos contra bounding sphere incorreta no r128 |
| Diagnóstico limitado | Draw calls e memória já existiam | Acrescentados cache, assets, LOD, contornos e estado do Avatar V2 |

## Implementação da fundação visual

### Registro central de assets

O novo módulo `src/modules/00a-visual-foundation-avatar-v2.js` concentra:

- caminhos das texturas existentes;
- registro de modelos, materiais, texturas e LODs;
- estado de carregamento e fallback;
- perfis visuais `low`, `balanced` e `high`;
- métricas da camada visual.

Não foram acrescentados downloads externos nem dependências de CDN.

### Avatar V2 seguro

Foi criado o estado `avatar.version = 2` com:

- normalização de IDs;
- validação de cores hexadecimais;
- migração automática do estado antigo;
- compatibilidade com roupa, chapéu, acessório e uniforme atuais;
- `renderMode: procedural-fallback`;
- preservação do estúdio e da aparência atual.

A raiz visual do personagem agora possui:

- `OTTHI_AVATAR_ROOT`;
- `BODY_ROOT`;
- `TORSO`, `HEAD`, braços e pernas nomeados;
- `TOOL_SOCKET`;
- `HAND_LEFT_SOCKET`;
- `BACK_SOCKET`;
- `HEAD_SOCKET`;
- `VEHICLE_SOCKET`.

Esses sockets são preparação estrutural. A V646.7 não introduz novas skins visuais nem muda o corpo que aparece na partida.

### Materiais, geometrias e descarte

- cores numéricas imutáveis usam `renderMat()`;
- caixas e cilindros continuam reutilizando geometrias;
- materiais que mudam opacidade, emissivo ou cor continuam exclusivos;
- contornos reutilizam `EdgesGeometry` e `LineBasicMaterial`;
- a remoção de acessórios, móveis temporários e camadas de veículos não descarta recursos compartilhados;
- referências de contornos removidos também são limpas.

### LOD real

Foram acrescentados dois níveis, sem mudar as coordenadas do mundo, para:

- árvores coletáveis e decorativas;
- rochas;
- árvores urbanas;
- prédios periféricos de fundo.

O modelo de alta qualidade preserva a geometria anterior. O modelo simples é usado apenas à distância e as distâncias são ajustadas pelo nível de qualidade.

## Preservação comprovada

Os seguintes arquivos permanecem byte a byte iguais ao ZIP original:

| Arquivo | SHA-256 |
|---|---|
| `firebase-config.js` | `72d2fc80efc82b6df856c5b43fd9cc37990cf3fe6ea27c4d90060b4c960e56fd` |
| `firebase-database.rules.json` | `2e61ee7bb249d1056691dafb6f352a291f39fb39ca79880255f2d7fd11b4c79f` |
| `assets/js/multiplayer-rtdb.js` | `087294b5292e368ce7f8df47b2c7d75354349219a059605fa1a0cea0a514a906` |
| `assets/vendor/three-r128.min.js` | `9274bbcec8d96168626c732b5d31c775aa8cfb7eaa0599bec0c175908a2c1ce2` |
| `athos.glb` | `98c8acdbd7e4160eeb34347a3706041b50fa12d2875a03d852e3b218b7959cdb` |
| `style.css` | `a4fdba497367197ebb1ee24e8da9f25863dbf94b46852bcfd686bcb8e12d73f6` |

O teste de preservação também confirmou que as 727 funções originais, contando as assíncronas, continuam presentes na mesma ordem relativa.

## Three.js

O pacote local r128 foi deliberadamente mantido. A versão oficial mais recente verificada nesta auditoria era r185, mas a migração não faz parte da Etapa 1.

Referências oficiais consultadas:

- [Releases do Three.js](https://github.com/mrdoob/three.js/releases)
- [Guia oficial de migração](https://github.com/mrdoob/three.js/wiki/Migration-Guide/8b0623085193bda0569b57d6a0d3784a35b72f87)
- [THREE.LOD](https://threejs.org/docs/pages/LOD.html)
- [THREE.InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [KTX2Loader](https://threejs.org/docs/pages/KTX2Loader.html)
- [EffectComposer](https://threejs.org/docs/pages/EffectComposer.html)
- [Khronos KTX](https://www.khronos.org/ktx/)

## Itens não implementados nesta etapa

- remodelagem ou rig do `athos.glb`;
- editor completo de skins;
- upload de imagens;
- novos modelos de roupas e cabelos;
- veículos montáveis;
- novos mapas PBR;
- conversão KTX2;
- pós-processamento;
- atualização do Three.js.

## Limites

Os testes automatizados são estruturais e determinísticos. Não foi declarado teste aprovado em aparelho físico. Firebase remoto, multiplayer entre aparelhos, AR, instalação PWA real, APK e desempenho GPU em celulares continuam obrigatórios. O ambiente de auditoria não possuía um executável Chromium para uma sessão WebGL headless, portanto esse teste também não foi marcado como concluído.

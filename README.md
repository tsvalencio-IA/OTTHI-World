# OTTHI World V700

Versão completa preparada para um novo repositório chamado **OTTHI-World**.

Esta entrega evolui a base real do OTTHI sem reescrever o jogo e sem trocar o Firebase Realtime Database existente. A física, os controles, o mapa, as casas, os veículos, as missões, as profissões, a construção, o multiplayer, a educação adaptativa e os salvamentos anteriores continuam sendo a fundação do projeto.

## Cinco etapas implementadas

### 1. Fundação profissional

- arquitetura modular preservada;
- cache de materiais e contornos;
- culling e LOD da fundação V646.7;
- registro central de assets e diagnóstico;
- níveis de qualidade e fallbacks;
- personagem e veículos anteriores mantidos como fallback.

### 2. Personagem modular

- Avatar V3 original OTTHI;
- estilos `Blocks`, `Toys` e `Heroes`;
- corpo, rosto, cabelo, roupa, calçado, costas, estampas e cores;
- compatibilidade com as escolhas clássicas;
- save local e sincronização pelo fluxo já existente;
- rig procedural antigo preservado para não alterar física nem controles.

### 3. Mundo, texturas e render

- 26 pacotes de materiais locais;
- canais base color, normal, roughness, ambient occlusion, height e emissive;
- 157 arquivos na pasta `assets/world`;
- materiais estilizados para terreno, vias, água, madeira, pedra, paredes, pisos, veículos, vegetação, energia e cogumelos;
- vegetação e detalhes instanciados;
- detalhes adicionais em casas e marcos visuais;
- atmosfera e ciclo de iluminação opcional;
- qualidade adaptativa para reduzir impacto em celulares.

### 4. Construção e máquinas modulares

- novas receitas de telhado, porta, janela, escada, mesa, cadeira, caixote, cogumelo, plataforma de energia e bancada;
- veículos com carroceria, capô, teto, rodas, traseira, luzes, cores e durabilidade;
- garagem modular integrada aos veículos atuais;
- direção, entrada e saída, física, colisões e missões originais preservadas.

### 5. Aventura, plataforma e poderes

- cinco poderes originais OTTHI;
- energia, recarga, seleção, domínio e desbloqueio;
- HUD próprio;
- Circuito das Nuvens com plataformas, cristais, checkpoints, tempo, recompensas e progressão;
- identidade original, sem personagens, marcas, logotipos ou ativos de terceiros.

## Realtime Database preservado

Os arquivos abaixo foram mantidos byte por byte em relação à base recebida:

- `firebase-config.js`;
- `firebase-database.rules.json`;
- `assets/js/multiplayer-rtdb.js`.

A raiz de multiplayer permanece `otthosWorld`. Não crie outro banco para esta versão. Para manter os jogadores e dados atuais, publique este projeto usando a mesma configuração Firebase já existente.

## Compatibilidade preservada

- Three.js local r128;
- `athos.glb` original;
- save anterior V646 com migração para V700;
- PWA e Service Worker;
- projeto Android;
- retrato e paisagem;
- controles mobile e gamepad;
- Firebase, salas e multiplayer existentes;
- casas, interiores, construção, barcos, ônibus, metrô, pescaria e profissões;
- polícia, bombeiros, ambulância, missões e educação adaptativa.

## Estrutura principal

- `src/modules/` — módulos-fonte JavaScript;
- `src/styles/` — módulos-fonte CSS;
- `src/module-order.json` — ordem e integridade dos módulos;
- `app.js` e `style.css` — bundles gerados;
- `assets/world/` — novos materiais e manifesto PBR;
- `tools/` — build, inventários e validações;
- `docs/` — relatórios, matrizes, inventários e instruções;
- `android-app/` — wrapper Android preservado e atualizado para V700.

## Build local ou GitHub Actions

O repositório já inclui o workflow `.github/workflows/build-modular-app.yml`.

Para quem usa terminal:

```bash
python tools/build_project.py
node --check app.js
python tools/test_v700_otthi_world.py
python tools/validate_project.py
```

O uso de terminal não é necessário para publicar pelo GitHub. Consulte `COMO-SUBIR-NOVO-REPOSITORIO.txt` e `docs/GUIA-NOVO-REPOSITORIO-OTTHI-WORLD.md`.

## Validação realizada

Foram executados build modular, validação de sintaxe, testes de mobilidade, mundo, bairros, permissões, botões, missões, multiplayer estrutural, serviços, responsividade, preservação das funções da base e testes específicos da V700.

Também foi executado um harness de navegador com o código real e stubs isolados para WebGL e RTDB. Esse harness comprova inicialização lógica das novas camadas, mas não equivale a teste gráfico real em GPU nem a conexão Firebase remota.

## Validações físicas ainda obrigatórias

A versão não deve ser declarada aprovada em aparelho físico antes de testar:

- Android real em retrato e paisagem;
- renderização WebGL e desempenho em aparelhos básicos e intermediários;
- texturas e iluminação com GPU real;
- Firebase remoto com as regras publicadas;
- multiplayer entre dois aparelhos;
- atualização e instalação da PWA;
- APK gerado e instalado;
- AR, quando aplicável.

Consulte `docs/RELATORIO-ENTREGA-OTTHI-WORLD-V700.md` para o escopo e as limitações verificadas.

---

**Powered by thIAguinho Soluções Digitais**

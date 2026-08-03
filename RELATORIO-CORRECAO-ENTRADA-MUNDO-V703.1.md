# OTTHI World V703.1 — correção da entrada no mundo

## Escopo real

Esta revisão foi criada diretamente sobre o conteúdo atual da V703 publicada no repositório `tsvalencio-IA/OTTHI-World`.

Ela corrige exclusivamente o erro exibido ao abrir o mundo:

```text
Cannot access 'coopActionInteractable' before initialization
```

Não reorganiza o cenário, não altera coordenadas, não reescreve missões, não troca Firebase e não modifica saves.

## Causa encontrada

O `buildWorld()` chama `createCooperativeMissionWorld()` durante a construção do cenário. Porém, no manifesto anterior, `32-cooperative-missions.js` era compilado depois dos módulos de renderização e bootstrap. Assim, um fluxo de inicialização podia chegar à criação do mundo antes de a declaração lexical `coopActionInteractable` ter sido inicializada.

## Correção aplicada

- `32-cooperative-missions.js` foi movido no manifesto para antes de `25-render-init-resize-position-collision.js`.
- O `app.js` foi recompilado a partir das fontes.
- A versão de recursos foi alterada de `7030` para `7031` para impedir reutilização do bundle anterior pelo navegador/PWA.
- O Service Worker recebeu nova revisão e novo cache.
- `release-manifest.json` foi regenerado com SHA-256 dos arquivos de publicação.
- Foi criado teste específico para garantir que o módulo cooperativo e `coopActionInteractable` sejam inicializados antes de `initThree()` e do bootstrap.

## O que não foi alterado

- Firebase e regras do banco;
- autenticação e contas;
- saves locais e em nuvem;
- mundo, ruas, casas e coordenadas;
- multiplayer;
- personagens e skins;
- missões e recompensas;
- painel GM;
- texturas e materiais;
- controles.

## Validação executada

- sintaxe de `app.js` e `sw.js`;
- build modular completo;
- sincronização de `app.js` com as 42 fontes JavaScript;
- hashes da release;
- teste específico da ordem de inicialização: 8/8;
- validação estrutural geral: 184/184;
- bairros e salas: 87/87;
- painel GM/preservação: 57/57;
- runtime do Service Worker aprovado no teste automatizado.

## Limite declarado

Não foi possível confirmar esta revisão em um celular físico com WebGL real neste ambiente. Portanto, a correção está comprovada no código, na ordem do bundle e nos testes automatizados, mas ainda precisa ser confirmada no aparelho após publicação integral e atualização do cache.

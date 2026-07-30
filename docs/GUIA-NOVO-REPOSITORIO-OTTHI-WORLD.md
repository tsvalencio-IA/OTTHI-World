# Guia de publicação — OTTHI-World

## 1. Criar o repositório

Crie um repositório vazio com o nome **OTTHI-World**. Não gere outro README durante a criação.

## 2. Enviar a estrutura completa

Extraia o ZIP. Entre na pasta `OTTHI-World` e envie todo o conteúdo para a raiz do repositório. O resultado correto deve mostrar `index.html`, `app.js`, `style.css`, `VERSION.json` e `firebase-config.js` diretamente na página inicial do GitHub.

Não envie apenas os bundles. A versão depende também de:

- `src/` e `tools/` para build e auditoria;
- `assets/world/` para os materiais profissionais;
- `.github/workflows/` para validação e APK;
- `android-app/` para o wrapper Android;
- `docs/` para relatórios e rastreabilidade.

## 3. Ativar GitHub Pages

Em **Settings > Pages**, selecione:

- Source: `Deploy from a branch`;
- Branch: `main`;
- Folder: `/ (root)`.

Depois de publicado, abra a URL com `?v=7000` para evitar cache antigo na primeira validação.

## 4. Manter o mesmo Realtime Database

Não crie outro banco. A entrega preserva os arquivos de configuração, regras e multiplayer da base recebida. A raiz continua `otthosWorld`.

Evite alterar manualmente:

- `firebase-config.js`;
- `firebase-database.rules.json`;
- `assets/js/multiplayer-rtdb.js`.

As regras remotas devem ser conferidas antes de republicá-las. Publicar uma regra errada pode bloquear ou expor dados.

## 5. Conferir GitHub Actions

O workflow **Build modular OTTHI World V700** recompila os bundles e executa os validadores. O commit precisa permanecer coerente: se uma alteração em módulos gerar diferença em `app.js`, `style.css`, `module-order.json` ou manifestos, a Action falhará até que os bundles sejam atualizados.

## 6. Gerar APK

Execute manualmente a Action **Gerar APK OTTHI World V700**. Ela verifica se o GitHub Pages já expõe a mesma versão e build antes de compilar o APK de teste.

## 7. Checklist de liberação

A publicação técnica não substitui os testes físicos. Valide em aparelhos reais:

- controles e escala da interface em retrato e paisagem;
- FPS, draw calls e memória;
- carregamento das texturas locais;
- Avatar V3 e fallback clássico;
- garagem e veículos;
- construção modular;
- Circuito das Nuvens e poderes;
- todas as jogabilidades antigas;
- salvamento local e nuvem;
- dois jogadores na mesma sala;
- atualização da PWA;
- instalação do APK.

**Powered by thIAguinho Soluções Digitais**

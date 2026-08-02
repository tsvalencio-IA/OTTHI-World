# OTTHI World V703 — Recuperação funcional

Esta é uma **entrega completa**, reconstruída sobre a base **V702.1**, identificada como a última consolidação funcional anterior às camadas que desorganizaram o cenário nas Revisões 7 e 8.

Não aplique esta versão como hotfix e não misture seus arquivos com a Revisão 8. A publicação correta substitui integralmente o projeto por este pacote, depois de homologação.

## O que foi recuperado

Os módulos responsáveis por materializar vias, bairros, casas, transporte, serviços, aventura, água e evolução básica do mundo foram restaurados exatamente da V702.1. A equivalência é verificada por hashes no teste `tools/test_v703_recovery.py`.

A recuperação não simplifica o jogo e não remove sistemas para os testes passarem. Permanecem contas, autenticação, Firebase, saves, painel GM, casas, personalizações, inventário, profissões, escolas, construção, veículos, transporte, pescaria, agricultura, PWA e wrapper Android da base funcional.

## Correções específicas da V703

### Multiplayer e aparência

- a presença online envia uma descrição compacta da aparência real do avatar;
- o jogador remoto deixa de ser sempre um fantasma genérico;
- estilo corporal, rosto, cabelo, roupas, calçados, acessórios, uniforme e cores são reconstruídos no outro aparelho;
- cada usuário autenticado pode gravar presença somente no próprio UID nas regras incluídas.

### Queda e jogador preso

- a última posição segura é mantida separadamente;
- posições em queda, água, veículo, barco ou transporte não substituem o ponto seguro;
- há recuperação automática para posição inválida, queda abaixo do terreno, saída do mundo e aprisionamento em collider;
- o menu de pausa possui **Desprender — voltar ao último ponto seguro**.

### Missões cooperativas

- uma missão só inicia quando suas dependências reais existem no mundo;
- cada etapa possui instrução, métrica, alvo e próximo destino;
- a corrida de rua usa checkpoints sequenciais sobre vias existentes;
- adversários seguem a rota viária e param na chegada;
- a corrida oval exige os setores em ordem antes de contar a volta;
- a pescaria usa a mesma coordenada para fogueira, GPS e objetivo.

## Fonte e bundles

- `src/modules/` — módulos-fonte JavaScript;
- `src/styles/` — módulos-fonte CSS;
- `src/module-order.json` — ordem dos módulos;
- `app.js` e `style.css` — bundles gerados e sincronizados;
- `tools/` — build e validações;
- `android-app/` — wrapper Android V7.0.3;
- `firebase-database.rules.json` — regras a publicar no mesmo Realtime Database.

## Build e validação

```bash
python tools/build_project.py
node --check app.js
python tools/validate_project.py
python tools/verify_equivalence.py
python tools/test_v703_recovery.py
```

A validação local verifica sintaxe, integridade dos bundles, hashes, preservação de funções, segurança estrutural, restauração da base mundial, contrato de skin remota, recuperação de queda e objetivos cooperativos.

## Limites honestos da validação

Ainda exigem teste real antes da produção:

- renderização WebGL em celular com GPU real;
- retrato e paisagem em aparelhos físicos;
- duas contas conectadas em dois aparelhos;
- publicação e leitura das regras no Firebase remoto;
- desconexão, reconexão e remoção de presença fantasma;
- instalação e atualização da PWA;
- APK assinado e instalado;
- desempenho prolongado e consumo de memória.

Consulte os relatórios V703 na raiz do pacote antes da publicação.

---

**Powered by thIAguinho Soluções Digitais**

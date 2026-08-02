# Plano de publicação segura — OTTHI World V703

## Não fazer

- Não publicar a Revisão 8.
- Não aplicar os oito arquivos antigos.
- Não misturar arquivos V703 com pastas de versões anteriores.
- Não substituir a produção antes do teste com duas contas.

## Sequência obrigatória

1. Baixar uma cópia integral do repositório atualmente publicado.
2. Exportar ou registrar um backup do Realtime Database antes de publicar regras.
3. Criar uma branch de homologação, por exemplo `teste-v703`.
4. Remover o conteúdo antigo dessa branch e enviar **todo o conteúdo** da pasta `OTTHI-World-main` da V703.
5. Confirmar que `.nojekyll`, `index.html`, `app.js`, `style.css`, `VERSION.json`, `manifest.webmanifest` e `sw.js` estão na raiz.
6. Publicar `firebase-database.rules.json` no mesmo projeto Firebase usado atualmente.
7. Abrir a homologação em janela anônima para evitar reutilização de cache antigo.
8. Testar duas contas diferentes em dois aparelhos.
9. Confirmar que cada aparelho vê a skin real do outro.
10. Trocar a aparência de uma conta e confirmar a atualização no outro aparelho.
11. Desconectar uma conta e confirmar a remoção da presença após o tempo previsto.
12. Simular perda de conexão e confirmar reconexão sem duplicar avatar.
13. Forçar uma queda e testar recuperação automática.
14. Testar o botão **Desprender**.
15. Executar uma missão cooperativa de cada tipo e verificar cada etapa.
16. Conferir visualmente ruas, casas, lago, escola, serviços e transporte.
17. Testar retrato e paisagem em aparelhos de alturas diferentes.
18. Somente depois, substituir a branch de produção pela V703 completa.

## Critério de bloqueio

Não promover para produção se ocorrer qualquer um destes pontos:

- avatar remoto genérico ou com skin errada;
- jogador duplicado após reconexão;
- presença que não desaparece;
- queda sem retorno;
- missão iniciada sem objetivo ou sem dependência existente;
- rota de bot atravessando cenário;
- construção sobre via observada no mapa recuperado;
- erro de console que interrompa o jogo;
- cache servindo arquivos de versão anterior.

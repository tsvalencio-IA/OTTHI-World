# OTTHI WORLD V705.7 R2 — homologação para exibição

Data: 24/08/2026  
Release: `705.7-exhibition-readiness-r2`  
Ativos/cache: `70572`  
Android: `versionCode 70572` / `versionName 7.0.5.7.2`

## Resultado

A R2 está aprovada para exibição local e demonstração de jogabilidade dentro do escopo validável neste computador. A base existente foi corrigida cirurgicamente; Firebase, multiplayer, contas, missões, esportes, construções, PWA e sistemas anteriores foram preservados.

- validação estrutural e regressiva: **210/210**;
- matriz funcional em Microsoft Edge/Playwright: **47/47**;
- auditoria geométrica do mundo em runtime: **0 problemas**;
- responsividade: **7/7 formatos**, sem rolagem horizontal e com controles críticos dentro da tela;
- persistência IndexedDB após recarregar: aprovada;
- shell PWA sem rede: aprovado;
- erros JavaScript não esperados na matriz final: **0**.

Evidências detalhadas:

- `docs/VALIDACAO-ESTRUTURAL-V704.json`;
- `docs/qa-v7057-r2/TESTE-NAVEGADOR-EXIBICAO-V7057-R2.json`;
- `docs/qa-v7057-r2/exibicao-568x320.png`;
- `docs/qa-v7057-r2/exibicao-1366x768.png`;
- `docs/qa-v7057-r2/exibicao-desktop-final.png`.

## Correções confirmadas nesta R2

1. A API pública correta (`OTTHOS_TEST_API`) voltou a receber os diagnósticos da camada profissional e da evolução do mundo.
2. A auditoria espacial passou a distinguir vias permitidas, colliders próprios do castelo e caminhos de pedestres conectados à malha viária.
3. O veículo de serviço OTTOVIAS e o veículo do ginásio foram retirados de dentro de estruturas.
4. Vôlei e futevôlei receberam conexão pedonal materializada com a rede de acesso.
5. Entrada e saída de casa agora são homologadas pelo resultado real, sem falso positivo.
6. O teste de direção escolhe um veículo real disponível e não simula física com o estado de veículo desligado.
7. Embarque de ônibus e viagem de metrô passaram a preparar e confirmar estados reais de portas, parada e término da viagem.
8. Os controles em paisagem receberam autoridade CSS final sobre regras antigas; o botão da direita não ultrapassa mais a tela em 1024×768 e 1366×768.
9. Cache, manifesto PWA e versão Android foram incrementados para impedir que a R1 antiga continue sendo exibida.
10. Paradas coincidentes foram consolidadas em uma única placa física, e a posição da sinalização agora considera a direção da rota e vias transversais; a auditoria reprova placas sobre pista/passeio ou agrupadas a menos de 3,5 m.

## Fluxos exercitados no navegador

- todos os 11 atalhos principais do lobby;
- Matemática, Português e Inglês;
- oito trabalhos, com início, estado ativo, conclusão e recompensa;
- construção, colocação e persistência;
- mapa, GPS e rota;
- tamanhos do personagem e abaixar;
- interior de casa e retorno ao mundo;
- veículo, aceleração, curva, saída e ausência de impacto no cenário de teste;
- ônibus, metrô, barco e desembarque;
- incêndio, bombeiros e parada educativa da polícia;
- presença multiplayer simulada;
- futebol, vôlei e encerramento de atividade;
- noticiário nos modos Só importantes, Todos e Silencioso;
- save local após recarregar;
- PWA carregando o shell com a rede desligada;
- 320×568, 568×320, 390×844, 844×390, 768×1024, 1024×768 e 1366×768.

## Limite profissional da homologação

“Pronto para exibição” não significa que todos os celulares, redes e contas reais do mercado estejam automaticamente certificados. Antes de vender para uma escola ainda são obrigatórios:

- teste em celulares Android físicos para sensor de rotação e FPS sustentado;
- instalação da PWA no aparelho, não apenas o shell offline no navegador automatizado;
- geração, instalação e teste do APK;
- Firebase remoto com as regras do ambiente de produção;
- multiplayer entre pelo menos dois aparelhos reais;
- teste de AR em aparelho compatível;
- sessão pedagógica com alunos e professor para validar clareza, dificuldade e tempo das missões.

Esses itens dependem de hardware, credenciais e ambiente externo; não foram declarados aprovados por testes locais.

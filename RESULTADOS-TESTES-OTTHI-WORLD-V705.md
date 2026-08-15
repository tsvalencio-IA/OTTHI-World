# Resultados de testes — OTTHI World V705

## Resultado geral local

- Suítes Python executadas: **16**
- Aprovadas: **16**
- Falhas: **0**
- Validação estrutural: **198/198**
- Teste específico V705: **25/25**
- Reconstrução do mundo V704 dentro da V705: **46/46**
- Funções detectadas no runtime: **958**
- Arquivos de módulos JavaScript: **46** (45 ativos + 1 stub de compatibilidade V704 não carregado)
- Módulos CSS: **19**

## Teste V705

Verifica, entre outros pontos:

- existência de uma única fonte esportiva;
- futebol 3 × 3;
- chute, passe, goleiros e IA de cobertura;
- vôlei/futevôlei 2 × 2;
- três toques;
- levantamento contextual;
- set até 11 com dois pontos de diferença;
- pista de kart por `CatmullRomCurve3`;
- dez checkpoints;
- grid e três adversários;
- boxes, zebras e barreiras;
- penalização fora da pista;
- NPC visual arredondado;
- memória e estados do NPC;
- percepção de veículo e buzina;
- evasão e prevenção de caminhada em vias/obstáculos;
- integração do botão PODER aos esportes;
- presença do sistema no bundle compilado.

## Hashes estruturais após build

- `app.js`: `4e7982737d6eac986987dadb8540b2f11dcb87d4a8028c3a206bdf316ec56cc8`
- `style.css`: `aeaa2279d4068e50207fe0c1108573596bccd2480f64220fdb426e85236a914f`
- `src/module-order.json`: `a11b880d08f30c35acdc8ca4c627f81c0893e732c620cac2da617c397ad7b067`
- `release-manifest.json`: `7cac6888f7fa8cdfa2538b70aeec9d92ca15ff681842897ac29aa7afebf6e8c1`

## Não executado / não aprovado por falta de ambiente físico

- Android físico;
- GPU/WebGL real;
- multiplayer entre dois aparelhos;
- Firebase remoto em partida completa;
- PWA instalada;
- APK assinado;
- AR.

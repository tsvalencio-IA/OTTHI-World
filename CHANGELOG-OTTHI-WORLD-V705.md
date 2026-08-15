# Changelog — OTTHI World V705

## Esportes

- Substituído o protótipo esportivo V704 por uma única implementação V705.
- Futebol passou a partida 3 × 3 com companheiro, goleiros, adversários, chute, passe, gols, placar e cronômetro.
- Vôlei e futevôlei passaram a 2 × 2 com saque, rally, três toques, levantamento, rede, pontuação e reinício.
- Botão AÇÃO é contextual para chute/rebatida durante esportes.
- Botão PODER é contextual para passe/levantamento durante esportes.

## Kartódromo

- Removido traçado oval matemático do protótipo.
- Novo circuito fechado em spline com onze pontos de controle assimétricos.
- Adicionados boxes, zebras, barreiras, grid, dez checkpoints, três adversários, três voltas e penalização fora da pista.

## NPCs

- Base visual procedural refeita com volumes arredondados e proporções mais orgânicas.
- Adicionado cérebro local de estado e memória curta.
- NPCs pedestres percebem veículos em aproximação, velocidade/direção e buzina.
- NPCs podem desviar do perigo e procurar posição segura.
- Caminhada evita vias, água, hazards e colliders quando possível.
- Sistemas de NPCs de transporte/profissões preservados.

## Compatibilidade e infraestrutura

- Versão central atualizada para V705 / 7.0.5.
- Cache PWA atualizado para `v=7050`.
- Service Worker, manifest, Android e runtime sincronizados.
- Ordem modular preserva correção de `coopActionInteractable` antes do bootstrap/render.
- Firebase, regras, saves, painel GM, casas e multiplayer não foram substituídos.
- Autoridade do layout V704 preservada para impedir sobreposição de mundos concorrentes.

# Aplicação do vídeo enviado — NPCs V705

O vídeo foi interpretado como referência para um NPC organizado em três etapas: perceber informações do ambiente, interpretar o contexto e responder com uma ação coerente.

Na V705 isso foi traduzido em código para NPCs pedestres:

1. **Percepção:** distância ao jogador, movimento do jogador, veículo ativo, direção do veículo, velocidade e buzina.
2. **Contexto/memória:** estado atual, ameaça recente e curto histórico de perigo.
3. **Ação:** continuar andando, socializar, sair da frente, fugir lateralmente do veículo, recuperar-se e escolher novo destino seguro.

A caminhada também consulta vias, água, hazards e colliders. Não foi implementada uma IA generativa remota por NPC, pois isso aumentaria latência, custo e dependência de rede em um jogo mobile. O comportamento é local e determinístico, adequado ao loop de jogo em tempo real.

# Relatório de correções — OTTOVIAS V705.7 R3

## Base preservada

Esta revisão foi aplicada diretamente sobre a versão recebida do jogo. Missões, esportes, profissões, construção, casas, Firebase, multiplayer, inventário, saves, transportes e controles existentes foram preservados.

## Pedágio

- O botão de ação dentro do veículo agora prioriza a interação do pedágio.
- O texto do botão acompanha o estado real: **Pagar**, **Levantar** e **Passar**.
- O pagamento não abre mais a cancela automaticamente.
- A passagem autorizada consome uma única autorização e fecha a cancela depois do veículo.
- A travessia sem pagamento registra infração e aciona uma viatura.
- A viatura calcula uma rota pela malha viária, persegue o veículo, solicita que o condutor encoste e aplica multa na abordagem.

## Rodovia e fluxo

- Recursos de pedra são rejeitados sobre pista e acostamento, e eventuais pedras antigas nesses espaços são limpas na inicialização.
- Foi criado um túnel rodoviário com vão livre, portais, cobertura, sinalização e iluminação, sem objetos no meio das faixas.
- Foi criada uma passarela suspensa com escadas caminháveis, plataforma, guarda-corpo, sinalização e pedestres em movimento.
- Seis veículos autônomos circulam nos dois sentidos do circuito externo.
- A frota usa autoridade de faixa, distância de segurança e culling por distância para limitar o custo em celular.

## Michelle, notícias e orientação

- A foto real não integra o jogo, os bundles nem o cache offline; permanece somente a personagem 3D ficcional estilizada.
- O noticiário continua com os modos “Só importantes”, “Todos” e “Silencioso”, além do painel consultável.
- O wrapper Android usa sensor completo e atualiza o WebView quando a orientação muda.

## Validação

- Teste dedicado R3: 40 verificações aprovadas.
- Auditoria estática do layout: aprovada, sem conflitos.
- Build modular e hashes da release: regenerados.
- Homologação em aparelho Android físico, APK assinado, Firebase remoto e multiplayer entre dois aparelhos continua obrigatória antes da publicação comercial.


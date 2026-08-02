# Changelog — OTTHI World V703

## Base

- Reconstrução integral sobre a V702.1 funcional.
- Revisão 8 descartada como base de desenvolvimento.
- Nenhum arquivo da V702.1 removido.
- Onze módulos centrais do mundo preservados exatamente por hash.

## Multiplayer

- Adicionada descrição compacta e sanitizada da aparência do avatar na presença.
- Adicionado `avatarSig` para reconstruir o avatar remoto somente quando a aparência muda.
- Substituído fantasma remoto genérico por representação procedural correspondente à personalização recebida.
- Reconhecidos identificadores reais dos estilos V3 para rostos, cabelos, roupas, calçados, itens nas costas, estampas e acessórios.
- Regra de presença alterada para permitir escrita somente no próprio UID.

## Queda e recuperação

- Adicionado registro do último ponto seguro.
- Impedida gravação de posição transitória insegura como ponto de retorno.
- Adicionada recuperação automática para posição inválida, abaixo do terreno, fora dos limites ou dentro de collider.
- Estados de veículo, transporte, barco e natação são encerrados com segurança durante a recuperação.
- Adicionado botão manual **Desprender** ao menu de pausa.
- Adicionada API de recuperação para teste e diagnóstico.

## Missões cooperativas

- Adicionada pré-validação por tipo de missão.
- Adicionado snapshot verificável do objetivo atual.
- Corrida de rua convertida para checkpoints sequenciais na malha viária.
- Adversários convertidos para interpolação por polilinha da rota real.
- Removido fechamento diagonal da rota dos bots.
- Adversários passam a parar após concluir.
- Corrida oval passa a exigir setores em ordem.
- Fogueira de pescaria materializada e usada como destino real do GPS.

## Build, versão e cache

- Versão do projeto: 703.
- Build: `703.0-recovery-functional-world`.
- Android: versionCode 7030 / versionName 7.0.3.
- Cache do Service Worker atualizado para V703.
- Bundles recompilados a partir das fontes.
- Workflows atualizados para executar o teste V703.
- Testes antigos ajustados para exigir a regra de presença mais segura e a revisão atual.

## Documentação

- README substituído por instruções específicas de recuperação.
- Criado aviso para não publicar a Revisão 8 nem aplicar os oito arquivos antigos.
- Criados relatório de recuperação, resultados, plano de publicação e auditoria da base.

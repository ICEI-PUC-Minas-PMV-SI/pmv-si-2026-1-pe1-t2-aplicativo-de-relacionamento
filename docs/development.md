# Programação de Funcionalidades

Este documento apresenta a implementação do MatchConnect a partir dos requisitos funcionais e não funcionais definidos na especificação do projeto. Para cada funcionalidade entregue, são relacionados os requisitos atendidos, os artefatos de código-fonte criados, as estruturas de dados utilizadas e as instruções para acesso e verificação.

O sistema foi implementado como uma aplicação web estática, usando HTML, CSS e JavaScript. Nesta etapa, a persistência é feita no navegador por meio de `localStorage`, com dados simulados para perfis, matches, mensagens, eventos e recomendações.

## Ambiente de hospedagem e acesso

| Item | Descrição |
|------|-----------|
| Repositório | `https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t2-aplicativo-de-relacionamento` |
| Ambiente de hospedagem | GitHub Pages ou servidor estático equivalente |
| URL de acesso prevista | `https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t2-aplicativo-de-relacionamento` |
| Página inicial | `index.html` |
| Tela de cadastro | `pages/Cadastro/Cadastro.html` |
| Tela de login | `pages/Login/login.html` |
| Tela principal do usuário | `pages/home/Homeusuario.html` |
| Tela de administração | `pages/Admin/AdminDashboard.html` |

Para executar localmente, basta abrir o projeto em um servidor estático. Exemplo:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador.

## Requisitos funcionais atendidos

| ID | Requisito | Status | Artefatos criados |
|----|-----------|--------|-------------------|
| RF-001 | Permitir cadastro de conta com nome, data de nascimento, e-mail, senha e aceite dos termos. | Atendido | `pages/Cadastro/Cadastro.html`, `pages/Cadastro/cadastro.js` |
| RF-002 | Permitir login com credenciais cadastradas e verificação de duas etapas. | Atendido com 2FA simulado no navegador. | `pages/Login/login.html`, `pages/Login/login.js`, `assets/js/appData.js` |
| RF-003 | Permitir editar e inserir informações do perfil. | Atendido | `pages/EditarPerfil/EditarPerfil.html`, `pages/EditarPerfil/EditarPerfil.js`, `pages/Perfil/Perfil.html`, `pages/Perfil/Perfil.js` |
| RF-004 | Permitir informar interesses, valores pessoais e objetivos de relacionamento. | Atendido | `pages/CadastroInteresses/cadastrointeresses.html`, `pages/CadastroInteresses/cadastrointeresses.js`, `pages/EditarPerfil/EditarPerfil.js` |
| RF-005 | Permitir matching baseado em interesses, valores e preferências. | Atendido com dados simulados. | `assets/js/appData.js`, `pages/home/HomeUsuario.js`, `pages/CentralMatch/CentralMatch.js`, `pages/Matches/Matches.js` |
| RF-006 | Permitir indicar interesse ou rejeição por swipe. | Atendido | `pages/home/Homeusuario.html`, `pages/home/HomeUsuario.js`, `pages/home/HomeUsuario.css` |
| RF-007 | Permitir conversa por chat interno. | Atendido com persistência local. | `pages/Conversas/Conversas.html`, `pages/Conversas/Conversas.js`, `pages/Matches/Matches.js` |
| RF-008 | Permitir excluir conta e remover dados da plataforma. | Atendido na versão local, removendo conta e dados do `localStorage`. | `pages/Configuracoes/Configuracoes.html`, `pages/Configuracoes/Configuracoes.js` |
| RF-009 | Permitir recursos básicos de acessibilidade e responsividade. | Atendido parcialmente por HTML semântico, textos alternativos, contraste visual e layout responsivo. | `assets/css/App.css`, `assets/css/Internal.css`, `assets/css/Dashboard.css`, `assets/js/navigation.js` |
| RF-010 | Permitir assistente para sugerir perguntas e temas de conversa. | Atendido com o assistente EROS baseado em interesses em comum. | `pages/EROS/EROS.html`, `pages/EROS/EROS.js`, `assets/js/navigation.js`, `pages/home/HomeUsuario.js` |
| RF-011 | Permitir envio de imagens, áudios e GIFs no chat interno. | Atendido com upload local de imagem/áudio e GIF por URL. | `pages/Conversas/Conversas.html`, `pages/Conversas/Conversas.js` |
| RF-012 | Notificar usuários sobre matches, mensagens, eventos e alertas. | Atendido com central de notificações local. | `pages/Notificacoes/Notificacoes.html`, `pages/Notificacoes/Notificacoes.js`, `pages/CentralMatch/CentralMatch.js` |
| RF-013 | Identificar e sinalizar mensagens ofensivas. | Atendido com moderação simulada por palavras-chave e registro em `moderacaoMensagens`. | `pages/Conversas/Conversas.js` |
| RF-014 | Permitir bloquear/denunciar perfis inadequados. | Atendido com denúncia e bloqueio local de perfis. | `pages/Seguranca/Seguranca.html`, `pages/Seguranca/Seguranca.js`, `pages/Conversas/Conversas.js`, `assets/js/appData.js` |
| RF-014A | Permitir ao administrador gerir usuários, denúncias e métricas da plataforma. | Atendido com telas de administração, controle de usuários e central de denúncias. | `pages/Admin/AdminDashboard.html`, `pages/Admin/AdminUsuarios.html`, `pages/Admin/AdminDenuncias.html`, `pages/Admin/AdminDashboard.js`, `pages/Admin/AdminUsuarios.js`, `pages/Admin/AdminDenuncias.js` |
| RF-015 | Permitir verificação de identidade por idade e dados básicos. | Atendido parcialmente: idade mínima validada no cadastro e status de verificação simulado na Central de Segurança. | `pages/Cadastro/cadastro.js`, `pages/Seguranca/Seguranca.js`, `pages/Perfil/Perfil.js` |
| RF-016 | Permitir configurar filtros de matching por idade, distância, interesse e objetivo. | Atendido | `pages/Filtros/Filtros.html`, `pages/Filtros/Filtros.js`, `pages/CadastroInteresses/cadastrointeresses.js`, `pages/home/HomeUsuario.js` |
| RF-017 | Alertar quando a conversa começar a ficar sem respostas. | Atendido com alerta visual no chat quando a conversa está sem resposta do usuário. | `pages/Conversas/Conversas.html`, `pages/Conversas/Conversas.js` |
| RF-018 | Limitar conversas simultâneas e permitir encerrar conversa. | Atendido com limite de 3 conversas ativas e botão de encerramento. | `pages/Conversas/Conversas.html`, `pages/Conversas/Conversas.js`, `assets/js/appData.js` |
| RF-019 | Oferecer funcionalidades Premium para usuários VIP. | Atendido como simulação de planos e assinatura. | `pages/Planos/Planos.html`, `pages/Assinatura/Assinatura.html`, `pages/Assinatura/Assinatura.js`, `pages/Visualizacoes/Visualizacoes.html`, `pages/Visualizacoes/Visualizacoes.js` |
| RF-020 | Permitir ligações pelo chat após certa quantidade de interação. | Atendido como simulação: ligação liberada após 3 mensagens enviadas. | `pages/Conversas/Conversas.html`, `pages/Conversas/Conversas.js` |

## Requisitos não funcionais atendidos

| ID | Requisito | Evidência de implementação |
|----|-----------|----------------------------|
| RNF-001 | Interface adequada para dispositivos móveis, tablets e computadores. | Uso de Bootstrap, grades responsivas e folhas CSS globais em `assets/css/`. |
| RNF-002 | Boas práticas de acessibilidade digital. | Uso de labels, textos alternativos em imagens de perfil, botões com texto claro, contraste visual e navegação estruturada. |
| RNF-003 | Compatibilidade com navegadores modernos. | Implementação em HTML5, CSS3 e JavaScript puro, sem dependência de backend. |
| RNF-004 | Proteção de dados pessoais. | Sessão e dados salvos localmente no navegador; a versão atual não envia dados para servidor externo. |
| RNF-005 | Mensagens claras em erros e falhas. | Validações de cadastro, login, edição de perfil, filtros e segurança exibem mensagens diretas ao usuário. |
| RNF-006 | Tempo de resposta adequado. | Operações são locais, usando arrays em memória e `localStorage`, sem chamadas de rede. |

## Artefatos de código-fonte

| Área | Arquivos principais | Descrição |
|------|---------------------|-----------|
| Página pública | `index.html`, `assets/css/MatchC.css` | Apresentação inicial do MatchConnect e links para cadastro/login. |
| Cadastro e autenticação | `pages/Cadastro/*`, `pages/Login/*`, `pages/CadastroInteresses/*` | Criação de conta, validação de idade, login e preenchimento inicial de interesses. |
| Módulo compartilhado | `assets/js/appData.js` | Centraliza perfis simulados, cálculo de compatibilidade, sessão, proteção de páginas e helpers de persistência. |
| Navegação global | `assets/js/navigation.js` | Menu interno, foto do usuário na navbar e assistente EROS global. |
| Home e swipe | `pages/home/Homeusuario.html`, `pages/home/HomeUsuario.js`, `pages/home/HomeUsuario.css` | Dashboard, descoberta de perfis, swipe, sugestões EROS e ações rápidas. |
| Matches e central | `pages/Matches/*`, `pages/CentralMatch/*` | Listagem de matches, detalhamento de compatibilidade e ações relacionadas ao match. |
| Chat | `pages/Conversas/*` | Lista de conversas, envio de mensagens e sugestões de abertura. |
| Assistente EROS | `pages/EROS/*` | Geração de mensagens, perguntas e ideias de encontro por perfil e tom de conversa. |
| Eventos e experiências | `pages/Eventos/*`, `pages/EventoDia/*`, `pages/EventoAoVivo/*`, `pages/Experiencias/*`, `pages/PrimeiroEncontro/*` | Sugestões de encontros, eventos do dia, sala ao vivo e planejamento de primeiro encontro. |
| Segurança | `pages/Seguranca/*` | Contato de confiança, verificação simulada e registro de denúncias. |
| Perfil e preferências | `pages/Perfil/*`, `pages/EditarPerfil/*`, `pages/Configuracoes/*`, `pages/Filtros/*` | Visualização e edição de perfil, preferências do usuário e filtros de descoberta. |
| Administração | `pages/Admin/*` | Painel do administrador com métricas, controle de usuários e análise de denúncias. |
| Planos | `pages/Planos/*`, `pages/Assinatura/*`, `pages/Visualizacoes/*` | Planos Premium, simulação de assinatura e visualizações de perfil. |

## Estruturas de dados utilizadas

### Usuario

Persistência: chave `usuarios` e `usuarioLogado` no `localStorage`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `nome` | Texto | Nome informado no cadastro. | `Maria Silva` |
| `email` | Texto | E-mail usado como identificador de login. | `maria@email.com` |
| `dataNascimento` | Data em texto | Data usada para validar idade mínima. | `2000-04-15` |
| `senha` | Texto | Senha cadastrada na simulação local. | `123456` |

### InteressesUsuario

Persistência: chave `interessesUsuario` no `localStorage`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `fotos` | Lista de textos Base64 | Fotos enviadas no cadastro de interesses. | `["data:image/png;base64,..."]` |
| `interesses` | Lista de textos | Interesses escolhidos pelo usuário. | `["Cinema", "Livros", "Viagens"]` |
| `camadas.gostoMuito` | Lista de textos | Interesses de maior afinidade. | `["Cinema", "Livros"]` |
| `camadas.queroExplorar` | Lista de textos | Temas que o usuário deseja explorar. | `["Gastronomia"]` |
| `camadas.naoCurto` | Lista de textos | Temas que reduzem compatibilidade. | `["Academia"]` |
| `camadas.assuntoFavorito` | Texto | Assunto principal para iniciar conversas. | `Cinema` |
| `objetivo` | Texto | Objetivo de relacionamento. | `Relacionamento sério` |
| `personalidade` | Texto | Autodescrição de personalidade. | `Calma e curiosa` |
| `programaIdeal` | Texto | Tipo de encontro preferido. | `Cinema seguido de jantar` |
| `descricao` | Texto | Bio do perfil. | `Gosto de conversas leves...` |
| `qualidades` | Texto | Qualidades informadas pelo usuário. | `Empatia, humor` |
| `curiosidade` | Texto | Informação pessoal complementar. | `Coleciono ingressos de cinema` |

### PerfilBase

Persistência: constante `perfisBase` em `assets/js/appData.js`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `nome` | Texto | Nome do perfil simulado. | `Ana` |
| `idade` | Número | Idade do perfil. | `24` |
| `distanciaKm` | Número | Distância simulada. | `4` |
| `inicial` | Texto | Letra usada no avatar. | `A` |
| `interesses` | Lista de textos | Interesses do perfil. | `["Cinema", "Livros"]` |
| `objetivo` | Texto | Objetivo do perfil. | `Relacionamento sério` |
| `personalidade` | Texto | Traço principal do perfil. | `Calma e curiosa` |
| `programaIdeal` | Texto | Programa sugerido. | `Cinema seguido de jantar` |
| `bio` | Texto | Descrição exibida. | `Gosta de roteiros tranquilos...` |
| `mensagem` | Texto | Sugestão de abertura de conversa. | `Qual foi o último lugar que te surpreendeu?` |

### PreferenciasDescoberta

Persistência: chaves `filtrosMatchConnect` e `preferenciasDescoberta`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `idadeMinima` | Número | Idade mínima buscada. | `18` |
| `idadeMaxima` | Número | Idade máxima buscada. | `35` |
| `distanciaMaxima` | Número | Distância máxima em km. | `30` |
| `interesse` | Texto | Interesse prioritário usado no filtro. | `cinema` |
| `objetivo` | Texto | Objetivo de relacionamento filtrado. | `Relacionamento sério` |
| `estiloEncontro` | Texto | Programa ideal escolhido. | `Café ou restaurante` |

### Match e mensagens

Persistência: chaves `matchesUsuario`, `conversaAberta` e `mensagensUsuario`.

| Estrutura | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `matchesUsuario` | Lista de textos | Nomes dos perfis curtidos/matcheados. | `["Ana", "Mariana"]` |
| `conversaAberta` | Texto | Nome do perfil aberto no chat. | `Ana` |
| `mensagensUsuario` | Objeto | Mapa de conversas por nome do perfil. | `{ "Ana": [{ "autor": "Você", "texto": "Oi!" }] }` |
| `conversasAtivas` | Lista de textos | Conversas abertas dentro do limite simultâneo. | `["Ana", "Mariana"]` |
| `conversasEncerradas` | Lista de textos | Conversas encerradas pelo usuário. | `["Karol"]` |
| `autor` | Texto | Quem enviou a mensagem. | `Você` |
| `texto` | Texto | Conteúdo da mensagem. | `Oi, vi que gostamos de cinema.` |
| `tipo` | Texto | Tipo opcional de mídia enviada. | `imagem`, `audio` ou `gif` |
| `url` | Texto | Base64 ou URL da mídia enviada. | `data:image/png;base64,...` |
| `sinalizada` | Booleano | Indica mensagem marcada pela moderação. | `true` |

### Notificacao

Persistência: chave `notificacoesUsuario`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `icone` | Texto | Classe do ícone Bootstrap. | `bi-heart-fill` |
| `titulo` | Texto | Título da notificação. | `Novo match disponível` |
| `texto` | Texto | Mensagem exibida. | `Ana apareceu com alta compatibilidade.` |
| `lida` | Booleano | Indica se a notificação foi marcada como lida. | `false` |

### Denuncia

Persistência: chaves `denunciasUsuario`, `ultimaDenuncia`, `perfisBloqueados` e `moderacaoMensagens`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `pessoa` | Texto | Perfil denunciado. | `Ana` |
| `motivo` | Texto | Motivo selecionado/informado. | `Comportamento inadequado` |
| `data` | Data em texto ISO | Momento do registro. | `2026-05-19T10:30:00.000Z` |
| `perfisBloqueados` | Lista de textos | Perfis ocultados das recomendações e conversas. | `["Ana"]` |
| `moderacaoMensagens.texto` | Texto | Mensagem sinalizada por palavra ofensiva. | `mensagem ofensiva` |

### Administração

Persistência: campos em `usuarios` e `denunciasUsuario`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `role` | Texto | Tipo de usuário (`admin` ou `user`). | `admin` |
| `createdAt` | Data em texto ISO | Data de cadastro do usuário. | `2026-05-20T14:00:00.000Z` |
| `blocked` | Booleano | Conta bloqueada pelo administrador. | `true` |
| `perfilVerificado` | Booleano | Status de verificação de identidade. | `false` |
| `status` | Texto | Situação de denúncia/resolução no admin. | `pendente`, `em_analise`, `resolvido`, `rejeitado` |

### AssinaturaUsuario

Persistência: chave `assinaturaUsuario`.

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `plano` | Texto | Nome do plano selecionado. | `Premium` |
| `preco` | Texto | Preço apresentado ao usuário. | `R$ 29,90/mês` |
| `formaPagamento` | Texto | Forma de pagamento escolhida. | `Cartão de crédito` |
| `cupom` | Texto | Cupom informado, se houver. | `MATCH10` |
| `data` | Data em texto ISO | Momento da confirmação simulada. | `2026-05-19T10:30:00.000Z` |

### Segurança e encontro

Persistência: chaves `contatoConfianca`, `perfilVerificado`, `planoEncontro` e `conviteEvento`.

| Estrutura | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `contatoConfianca.nome` | Texto | Nome do contato de segurança. | `João` |
| `contatoConfianca.telefone` | Texto | Telefone do contato. | `(31) 99999-9999` |
| `perfilVerificado` | Booleano em texto | Status da verificação simulada. | `true` |
| `planoEncontro.match` | Texto | Pessoa convidada. | `Ana` |
| `planoEncontro.local` | Texto | Local sugerido. | `cafeteria movimentada` |
| `planoEncontro.horario` | Texto | Período escolhido. | `sábado à tarde` |
| `planoEncontro.mensagem` | Texto | Convite gerado. | `Topa um café curto...?` |

## Instruções de verificação por funcionalidade

### RF-001 - Cadastro de conta

1. Acesse `pages/Cadastro/Cadastro.html`.
2. Preencha nome, e-mail, data de nascimento, senha e confirmação.
3. Marque o aceite dos termos.
4. Clique em criar conta.
5. Resultado esperado: usuário salvo em `localStorage.usuarios`, sessão criada em `localStorage.usuarioLogado` e redirecionamento para `pages/CadastroInteresses/cadastrointeresses.html`.

### RF-002 - Login

1. Cadastre um usuário ou mantenha um registro em `localStorage.usuarios`.
2. Acesse `pages/Login/login.html`.
3. Informe e-mail e senha cadastrados.
4. Informe o código de verificação exibido na simulação de duas etapas.
5. Resultado esperado: sessão salva em `localStorage.usuarioLogado`, registro em `localStorage.ultimoLoginVerificado` e redirecionamento para `pages/home/Homeusuario.html`.

### RF-003 e RF-004 - Perfil e interesses

1. Após login, acesse `pages/CadastroInteresses/cadastrointeresses.html` ou `pages/EditarPerfil/EditarPerfil.html`.
2. Selecione ao menos três interesses, objetivo, personalidade, programa ideal e descrição.
3. Salve o formulário.
4. Resultado esperado: dados persistidos em `localStorage.interessesUsuario` e exibidos em `pages/Perfil/Perfil.html`.

### RF-005 e RF-006 - Matching e swipe

1. Acesse `pages/home/Homeusuario.html`.
2. Na área de descoberta, clique em curtir ou recusar perfis.
3. Resultado esperado: o card avança, a compatibilidade é exibida e perfis curtidos são salvos em `localStorage.matchesUsuario`.

### RF-007 - Chat interno

1. Acesse `pages/Conversas/Conversas.html`.
2. Escolha uma conversa na lista.
3. Digite uma mensagem e envie.
4. Resultado esperado: a mensagem aparece no chat e é salva em `localStorage.mensagensUsuario`.

### RF-008 - Exclusão de conta

1. Acesse `pages/Configuracoes/Configuracoes.html`.
2. Clique em excluir conta e dados.
3. Confirme a ação.
4. Resultado esperado: o usuário é removido de `localStorage.usuarios`, os dados locais da conta são apagados e o sistema redireciona para o cadastro.

### RF-011, RF-013, RF-017, RF-018 e RF-020 - Recursos avançados do chat

1. Acesse `pages/Conversas/Conversas.html`.
2. Envie uma imagem, áudio ou GIF usando os campos abaixo da mensagem.
3. Envie uma mensagem contendo uma palavra ofensiva de teste, como `ofensa`.
4. Observe o alerta de conversa sem resposta, o limite de 3 conversas ativas e o botão de encerrar conversa.
5. Envie 3 mensagens para o mesmo match e clique em ligar.
6. Resultado esperado: mídia renderizada no chat, mensagem ofensiva sinalizada, registro em `moderacaoMensagens`, conversa limitada/encerrável e chamada simulada liberada após interação suficiente.

### RF-010 - Assistente EROS

1. Acesse `pages/EROS/EROS.html`.
2. Selecione um perfil e um tom de conversa.
3. Clique para gerar nova sugestão.
4. Resultado esperado: o sistema exibe mensagem, pergunta e ideia de encontro baseadas nos interesses em comum.

### RF-012 - Notificações

1. Execute ações como salvar evento, salvar experiência ou registrar denúncia.
2. Acesse `pages/Notificacoes/Notificacoes.html`.
3. Resultado esperado: a central exibe notificações relacionadas e permite marcar todas como lidas.

### RF-014 e RF-015 - Segurança, denúncia e verificação

1. Acesse `pages/Seguranca/Seguranca.html`.
2. Salve um contato de confiança.
3. Acione a verificação simulada, registre uma denúncia ou bloqueie um perfil.
4. Resultado esperado: os dados são salvos em `contatoConfianca`, `perfilVerificado`, `denunciasUsuario`, `ultimaDenuncia` e `perfisBloqueados`.

### RF-016 - Filtros

1. Acesse `pages/Filtros/Filtros.html`.
2. Configure idade, distância, interesse e objetivo.
3. Clique em aplicar filtros.
4. Resultado esperado: a lista de perfis é filtrada e as preferências ficam salvas em `localStorage.filtrosMatchConnect`.

### RF-014A - Administração do sistema

1. Acesse `pages/Login/login.html` e entre com o administrador padrão `admin@matchconnect.com` / `admin123`.
2. Valide o código de duas etapas exibido no login.
3. Navegue para `pages/Admin/AdminDashboard.html`.
4. Verifique as métricas de usuários, denúncias e novos cadastros.
5. Em `pages/Admin/AdminUsuarios.html`, busque um usuário e teste bloquear/desbloquear, verificar/reverter e excluir um usuário não logado.
6. Em `pages/Admin/AdminDenuncias.html`, altere o status de uma denúncia para `Em análise`, `Resolvido` e `Rejeitado`.
7. Resultado esperado: ações de administrador são persistidas em `localStorage.usuarios` e `localStorage.denunciasUsuario`, e o painel reflete as mudanças.

### RF-019 - Planos Premium

1. Acesse `pages/Planos/Planos.html`.
2. Escolha um plano e avance para assinatura.
3. Preencha a forma de pagamento na tela `pages/Assinatura/Assinatura.html`.
4. Resultado esperado: assinatura simulada salva em `localStorage.assinaturaUsuario`.

## Observações sobre a implementação

As funcionalidades implementadas usam dados locais e simulados, adequados para validação do protótipo funcional da disciplina. Em uma versão de produção, as estruturas gravadas no `localStorage` devem ser migradas para uma API com backend, banco de dados, autenticação segura, criptografia de senhas, controle real de sessão, moderação automática e políticas completas de privacidade.

# Especificações do Projeto

|Perfil 1| Usuário                                 |
|--|-------------------------------------------------------|
|Descrisão:| Usuário maior de 18 anos, que utiliza frequentemente redes sociais e aplicativos de relacionamento. Busca conhecer novas pessoas com interesses semelhantes, seja para amizade, encontros ou relacionamentos. Possui alta familiaridade com tecnologia e utiliza o smartphone diariamente. |
|Necessidades:| Encontrar pessoas com interesses em comum, iniciar conversas de forma mais natural e ter uma experiência de interação menos superficial do que em aplicativos tradicionais.|

|Perfil 2| Administrador                      |
|--|-------------------------------------------------------|
|Descrisão:| Responsável por gerenciar a plataforma, monitorar denúncias, verificar conteúdos inadequados, validar cadastros quando necessário e manter o bom funcionamento do sistema.  |
|Necessidades:| Gerenciar a operação da plataforma, realizar a moderação de conteúdos e usuários, analisar e tratar denúncias, validar cadastros quando necessário e garantir a segurança, confiabilidade e estabilidade do sistema .|


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Criar um perfil com minhas informações, interesses e valores             | Encontrar pessoas com maior compatibilidade           |
|Usuário do sistema  | Responder um questionário sobre interesses e personalidade           | Melhorar a qualidade dos matches e sugestões de conexões          |
|Usuário do sistema  | Receber sugestões de perguntas de quebra-gelo            | Iniciar a conversa de forma mais natural         |
|Usuário do sistema  | Verificar minha identidade no cadastro            | Aumentar a confiança entre os usuários          |
|Usuário do sistema  | Visualizar eventos e pessoas interessadas nesses eventos            | Facilitar encontros presenciais e interações reais         |
|Usuário do sistema  | Receber sugestões de assuntos com base no perfil e interesses do match           | Desenvolver uma interação mais interessante e personalizada.          |
|Usuário do sistema  | Receber conteúdos e recomendações personalizadas de acordo com meu perfil e comportamento           | Ter uma experiência mais relevante dentro do aplicativo e permanecer mais tempo utilizando a plataforma          |
|Administrador do Sistema     | Gerenciar usuários (criar, editar, bloquear e excluir contas)             | Manter a integridade e organização da plataforma  |
|Administrador do Sistema      |  Visualizar um painel com métricas da plataforma             | Acompanhar o desempenho e o crescimento do sistema  |
|Administrador do Sistema      | Configurar regras e permissões do sistema                | Garantir que cada usuário tenha acesso adequado   |
|Administrador do Sistema      | Monitorar tentativas de acesso suspeitas                | Prevenir invasões e fraudes   |
|Administrador do Sistema      | Gerenciar níveis de acesso dos usuários                 | Proteger informações sensíveis   |
|Administrador do Sistema      | Revisar e validar informações cadastradas                 | Garantir a veracidade dos dados   |
|Administrador do Sistema      | Visualizar feedbacks e denúncias dos usuários                 | Tomar ações corretivas e melhorar a plataforma   |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF&#8209;001| O sistema deve permitir ao usuário cadastrar uma conta utilizando informações como nome, idade e e-mail e outros. | ALTA |  
|RF&#8209;002| O sistema deve permitir ao usuário realizar login em sua conta utilizando suas credenciais cadastradas e verificação de duas etapas.    | ALTA | 
|RF&#8209;003| O sistema deve permitir ao usuário editar e inserir as informações do seu perfil.   | ALTA|
|RF&#8209;004| O sistema deve permitir ao usuário informar seus interesses, valores pessoais e objetivos de relacionamento durante o cadastro ou edição do perfil   | ALTA | 
|RF&#8209;005| O sistema deve permitir ferramentas de matching baseado em interesses, valores e preferências dos usuários.    | ALTA | 
|RF&#8209;006| O sistema deve permitir ao usuário indicar interesse ou rejeição por meio de uma interface de swipe (deslizar para direita ou esquerda).     | ALTA | 
|RF&#8209;007| O sistema deve permitir que os dois usuários que deram match através do swipe, possam iniciar uma conversa e trocar mensagens por meio de um chat interno.   ALTA | 
|RF&#8209;008| O sistema deve permitir ao usuário excluir sua conta e remover seus dados da plataforma.  | MÉDIA | 
|RF&#8209;009| O sistema deve permitir recursos de acessibilidade como suporte a leitores de tela, contraste adequado e outros.    | ALTA | 
|RF&#8209;010| O sistema deve permitir um assistente que sugira perguntas e temas de conversa baseados nos interesses de ambos os usuários   | MÉDIA | 
|RF&#8209;011| O sistema deve permitir o envio de imagens, áudios e GIFs no chat interno.    | MÉDIA | 
|RF&#8209;012| O sistema deve permitir notificar os usuários quando houver novas atualizações dentro do chat interno ou de novos matches.    | MÉDIA | 
|RF&#8209;013| Sistema de moderação para identificar e sinalizar mensagens ofensivas.   | MÉDIA | 
|RF&#8209;014| O sistema deve permitir bloquear e denunciar perfis que apresentam comportamento inadequado ou ofensivo.   | MÉDIA | 
|RF&#8209;015| O sistema deve permitir a verificação de identidade do usuário por meio de confirmação de idade e dados básicos.     | MÉDIA | 
|RF&#8209;016| O sistema deve permitir ao usuário de configurar os filtros de matching como a busca por idade, localização, interesses e preferências de relacionamento.    | MÉDIA | 
|RF&#8209;017| O sistema deve permitir acesso a um sistema de alerta quando a conversa começar a ficar sem respostas.  | MÉDIA | 
|RF&#8209;018| O sistema deve permitir limitar a quantidade de conversas simultâneas para reduzir sobrecarga de interações e deixar ao usuário escolher se deseja ou não encerrar uma conversa.    | MÉDIA | 
|RF&#8209;019| O sistema deve oferecer funcionalidades Premium para usuários VIP.    | MÉDIA | 
|RF&#8209;020| O sistema deve permitir ligações pelo chat interno após uma certa quantidade de interação.     | BAIXA | 

<!-- Não coloquei às RF's com trés carácteres por questão do layout, visualmente ficou melhor assim, digo como: RF-001, e sim RF-01 obs: resolvi usando &#8209; no lugar de - -->


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF&#8209;001| Interface deve permitir o uso adequado em dispositivos móveis, tablets e computadores.  | ALTA | 
|RNF&#8209;002| Deve seguir boas práticas de acessibilidade digital permitindo o uso por pessoas com deficiências.  | ALTA | 
|RNF&#8209;003| Compatibilidade com navegadores modernos. | ALTA | 
|RNF&#8209;004| Proteção dos dados pessoais utilizando mecanismos de segurança de acordo com a LGPD.  | ALTA | 
|RNF&#8209;005| Fornecer mensagens claras e compreensíveis em caso de erros ou falhas no sistema.   | MÉDIA | 
|RNF&#8209;006| Deve apresentar tempo de resposta adequado durante as interações.  | MÉDIA| 



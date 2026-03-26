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
|Administrador       | Alterar permissões                 | Manter a integridade e organização da plataforma  |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

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


Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

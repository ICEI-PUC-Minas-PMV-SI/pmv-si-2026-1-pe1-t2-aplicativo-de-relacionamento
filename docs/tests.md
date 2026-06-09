# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.


**Caso de Teste** | **CT01 - Cadastro de usuário**
 :--------------: | ------------
**Procedimento**  | 1) Acessar a tela de cadastro <br> 2) Informar nome, e-mail, senha e data de nascimento <br> 3) Confirmar cadastro.  
**Requisitos associados** | RF-001
**Resultado esperado** | Conta criada com sucesso.
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Login**
 :--------------: | ------------
**Procedimento**  | 1) Informar e-mail e senha. <br> 2) Confirmar acesso.
**Requisitos associados** | RF-002
**Resultado esperado** | Usuário autenticado e redirecionado para a página principal.
**Dados de entrada** | Credenciais válidas e código correto.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT03 - Edição de perfil**
 :--------------: | ------------
**Procedimento**  | 1) Acessar perfil. <br> 2) Alterar biografia e foto. <br> 3) Salvar alterações.
**Requisitos associados** | RF-003
**Resultado esperado** | Perfil atualizado corretamente
**Dados de entrada** | Informações válidas.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT04 - Cadastro de interesses e preferências**
 :--------------: | ------------
**Procedimento**  | 1) Acessar configuração do perfil. <br> 2) Selecionar interesses, valores e objetivos de relacionamento <br> 3) Salvar.
**Requisitos associados** | RF-004
**Resultado esperado** | Preferências registradas no perfil.
**Dados de entrada** | Interesses e objetivos válidos.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT05 - Matching baseado em interesses**
 :--------------: | ------------
**Procedimento**  | 1) Configurar interesses compatíveis entre dois usuários. <br> 2) Acessar recomendações.
**Requisitos associados** | RF-005
**Resultado esperado** | Sistema sugere usuários compatíveis.
**Dados de entrada** | Perfis com interesses semelhantes.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT06 - Swipe para curtida**
 :--------------: | ------------
**Procedimento**  | 1) Visualizar perfil sugerido. <br> 2) Deslizar para a direita.
**Requisitos associados** | RF-006
**Resultado esperado** | Interesse registrado pelo sistema.
**Dados de entrada** | Perfil disponível para avaliação.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT07 - Formação de Match**
 :--------------: | ------------
**Procedimento**  | 1) Usuário A curte Usuário B. <br> 2) Usuário B curte Usuário A.
**Requisitos associados** | RF-005, RF-006, RF-007
**Resultado esperado** | Match criado e chat liberado.
**Dados de entrada** | Curtidas mútuas.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT08 - Envio de mensagens**
 :--------------: | ------------
**Procedimento**  | 1) Acessar conversa. <br> 2) Digitar mensagem. <br> 3) Enviar.
**Requisitos associados** | RF-007
**Resultado esperado** | Mensagem entregue e exibida aos participantes.
**Dados de entrada** | Texto válido.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT09 - Bloqueio e denúncia de usuário**
 :--------------: | ------------
**Procedimento**  | 1) Acessar perfil de outro usuário. <br> 2) Selecionar "Bloquear" ou "Denunciar".
**Requisitos associados** | RF-014
**Resultado esperado** | Usuário bloqueado ou denúncia registrada.
**Dados de entrada** | Perfil existente.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT10 - Exclusão de conta**
 :--------------: | ------------
**Procedimento**  | 1) Acessar configurações. <br> 2) Selecionar "Excluir Conta". <br> 3) Confirmar exclusão.
**Requisitos associados** | RF-008
**Resultado esperado** | Conta removida do sistema.
**Dados de entrada** | Usuário autenticado.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT11 - Responsividade da interface**
 :--------------: | ------------
**Procedimento**  | 1) Acessar a aplicação em computador, tablet e smartphone.
**Requisitos associados** | RF-001
**Resultado esperado** | Interface adaptada corretamente aos diferentes dispositivos.
**Dados de entrada** | Diferentes resoluções de tela.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT12 - Tempo de resposta**
 :--------------: | ------------
**Procedimento**  | 1) Navegar entre perfis, abrir conversas e enviar mensagens.
**Requisitos associados** | RF-006
**Resultado esperado** | Resposta inferior a 3 segundos nas principais funcionalidades.
**Dados de entrada** | Utilização normal da aplicação.
**Resultado obtido** | Sucesso


## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Cadastro de Usuário*                                         |
|---|---|
|Requisito Associado | RF-001 - O sistema deve permitir ao usuário cadastrar uma conta utilizando informações como nome, idade e e-mail e outros.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQBQnjfeIFFQQ43oIQiaYrAQAYf0vp9R1VjfEZpPXz0a1Y0?e=gOgIOT| 

|*Caso de Teste*                                 |*CT02 - Login*                                        |
|---|---|
|Requisito Associado | RF-002 - O sistema deve permitir ao usuário realizar login em sua conta utilizando suas credenciais cadastradas.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQBH2A3A1tKITLuYTUCuwcAdAcH-EljMnNmP2PJUmxIIiHY?e=xI8dvV | 

|*Caso de Teste*                                 |*CT03 - Edição de Perfil*                                        |
|---|---|
|Requisito Associado | RF-003 - O sistema deve permitir ao usuário editar e inserir as informações do seu perfil.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQAg80g2lg_RTZcfXEydHepTAdijgozUvGcSZisCy8qmG3I?e=EQX7ud | 

|*Caso de Teste*                                 |*CT04 - Cadastro de interesses e preferências*                                        |
|---|---|
|Requisito Associado | RF-004 - O sistema deve permitir ao usuário informar seus interesses, valores pessoais e objetivos de relacionamento durante o cadastro ou edição do perfil.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQBQnjfeIFFQQ43oIQiaYrAQAYf0vp9R1VjfEZpPXz0a1Y0?e=gOgIOT | 

|*Caso de Teste*                                 |*CT05 - Matching baseado em interesses*                                        |
|---|---|
|Requisito Associado | RF-005 - O sistema deve permitir ferramentas de matching baseado em interesses, valores e preferências dos usuários.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQCBsKdxWbQLRIOrt2OqkbIdAVJWNued4okfo-EoSYb7VOo?e=jEMKDB | 

|*Caso de Teste*                                 |*CT06 - Formação de Match e abertura do chat*                                        |
|---|---|
|Requisito Associado | RF-007 - O sistema deve permitir que usuários que deram match possam iniciar uma conversa.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQCI8QUSB4xcTK0SbbEn7eQqAR2_K3Js6XGRH-7KzTyCuH8?e=czBozv | 

|*Caso de Teste*                                 |*CT07 - Envio de mensagens no chat*                                        |
|---|---|
|Requisito Associado | RF-007 - O sistema deve permitir troca de mensagens por meio do chat interno.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQD6LtFxLCeUT40DONNbjEk3AaBToe8fEgDo5HBq2yHZDmI?e=LyNcZj | 

|*Caso de Teste*                                 |*CT08 - Bloqueio e denúncia de usuário*                                        |
|---|---|
|Requisito Associado | RF-014 - O sistema deve permitir bloquear e denunciar perfis inadequados.|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/cf8cb0076f147e7f/IQD_2SrrhOVNQaVYv34393kNAZXOR-JJy0pRurnWYQRnsxc?e=s3QlEW | 

|*Caso de Teste*                                 |*CT09 - Exclusão de conta*                                        |
|---|---|
|Requisito Associado | RF-008 - O sistema deve permitir ao usuário excluir sua conta e remover seus dados da plataforma.|
|Link do vídeo do teste realizado: | LINK DO VIDEO | 

|*Caso de Teste*                                 |*CT10 - Teste de Responsividade*                                        |
|---|---|
|Requisito Associado | RF-001 - Interface deve permitir uso adequado em dispositivos móveis, tablets e computadores.|
|Link do vídeo do teste realizado: | LINK DO VIDEO | 


## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você acabou de conhecer a plataforma e deseja criar uma conta. Realize o cadastro, faça login e complete as informações do seu perfil adicionando foto, descrição pessoal e interesses. |
| 2             | Você está procurando pessoas com interesses semelhantes aos seus. Utilize os filtros disponíveis para localizar perfis compatíveis e visualize as sugestões apresentadas pelo sistema. |
| 3             | Você encontrou um perfil interessante. Utilize a funcionalidade de swipe para demonstrar interesse e verifique se ocorre um match quando o outro usuário também demonstrar interesse. |
| 4             | Após obter um match, inicie uma conversa utilizando o chat interno e envie uma mensagem para o outro usuário. |


## Registro de Testes de Usabilidade

Cenário 1: Você acabou de conhecer a plataforma e deseja criar uma conta. Realize o cadastro, faça login e complete as informações do seu perfil adicionando foto, descrição pessoal e interesses.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você está procurando pessoas com interesses semelhantes aos seus. Utilize os filtros disponíveis para localizar perfis compatíveis e visualize as sugestões apresentadas pelo sistema.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

Cenário 3: Você encontrou um perfil interessante. Utilize a funcionalidade de swipe para demonstrar interesse e verifique se ocorre um match quando o outro usuário também demonstrar interesse.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

 Cenário 4: Após obter um match, inicie uma conversa utilizando o chat interno e envie uma mensagem para o outro usuário. 

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.




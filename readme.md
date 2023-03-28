**#API mini INSTAGRAM**

## O que o usuário pode fazer
- fazer login
- fazer cadastro
- visualizar do perfil
- editar os dados do perfil
- visualizar pastagens de terceiros
    - ver quantidade de curtidas em uma postagem
    - ver os comentários de uma postgem
- curtir postagens
- visualizar quantidade de curtidas
- visualizar comentários de postagens
- comentar postagens

## O que não será possível fazer no APP
- visualizar a localização das postagens
- visualizar quem curtiu as imagens
- comentar outros comentários
- curtir comentários

## Endpoints

---

### POST - Login

#### Dados enviados
- username
- senha

#### Dados recebidos
- sucesso / erro
- token

#### Objetivos gerais
- Validar username e a senha
- Buscar usuario no banco de dados
- Verificar se a senha informada está correta
- Gerar token de autenticação
- Retornar os dados do usuário e o token

---

### POST - Cadastro

#### Dados enviados
- username
- senha

#### Dados recebidos
- sucesso / erro

#### Objetivos gerais
- Validar username e a senha
- Verificar se o username ja existe no banco de dados
- criptografar a senha
- Cadastrar o usuario no banco de dados com a hash

---

### GET - Listar perfil

#### Dados enviados
- token (id ou username)

#### Dados recebidos
- url da foto
- nome string
- username string
- site string
- Bio string
- email string
- telefone string
- genero string

#### Objetivos gerais
- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token
- Retornar os dados do usuario
- retornar sucesso ou erro

---

### PUT - Editar perfil

#### Dados enviados
- token (id ou username)
- foto
- nome
- username
- site
- bio
- email
- tel
- gênero
- senha 

#### Dados recebidos
- sucesso / erro

#### Objetivos gerais
- Validar o token do usuario
- Validar se o token é válido e verificar se o usuario existe
- Exigir ao menos um campo para atualizar
- Caso informado a senha criptografar a mesma
- verfificar a não existencia do username e email para efetuar a alteração
- Atualizar o registro do usuario no banco de dados
- retornar sucesso ou erro

---

### GET - postagens

#### Dados enviados
- token(id ou username)
- offset (definir de paginação configurado pelo front ou usuario)

#### Dados recebidos 
- postagens [] 
    - id da postagem
    - texto
    - foi curtido pelo usuario
    - Usuario
        - URL da foto String
        - username String
        - é perfil verificado Booleano
    - Fotos [] 
    - quantidade de curtidas
    - Comentários [] 
        - username
        - texto
    - Data

#### Objetivos gerais
- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token
- Retornar postagens de terceiros
- retornar sucesso ou erro

---

### POST - postagens

#### Dados enviados
- token(id ou username)
- texto
- fotos []

#### Dados recebidos 
- sucesso / erro

#### Objetivos gerais
- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token
- exigir que seja informado pelo menos uma foto no array
- Cadastrar postagem para o usuário logado
- Cadastro das fotos da postagem
- retornar sucesso ou erro

---

### PUT - curtir postagem

#### Dados enviados
 - o usuario que curtiu (token id ou username)
 - id da postagem

#### Dados recebidos

- sucesso / erro

#### Objetivos gerais
- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token
- Buscar o cadastro da postagem com o id informado
- Verificar se usuario já curtiu a postagem
- cadastrar a curtida com id do usuário e da postagem no BD
- retornar sucesso / erro

---

### PUT - comentar postagem

#### Dados enviados
 - o usuario que comentou (token id ou username)
 - id da postagem
 - texto do comentário

#### Dados recebidos

- sucesso / erro

#### Objetivos gerais
- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token
- validar se texto foi enviado
- Buscar a postagem pelo ID informado
- Cadastrar comentário
- retornar sucesso ou erro

### Tabelas
- usuarios
- postagens
- postagens_fotos
- postagens_comentarios
- postagens_curtidas

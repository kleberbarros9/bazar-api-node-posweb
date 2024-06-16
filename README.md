
# Bazar API Node.js

Este projeto é parte da Pós-graduação em Desenvolvimento Web Full Stack na disciplina de Programação Web com Linguagens de Script. A implementação envolve a criação de rotas RESTful para manipulação de produtos para um bazar beneficente, utilizando Node.js (versão 21.7.2) e MongoDB-Atlas.

## Professor

Thiago Rodrigues

## Estudantes

- Kleber Barros
- Welison Nunes

## Descrição do Projeto

O objetivo deste projeto é desenvolver um sistema para um bazar beneficente onde os usuários podem doar produtos que posteriormente podem ser comprados. A aplicação foi desenvolvida utilizando Node.js e MongoDB-Atlas.

## Instalação e Execução

### Clonar o Repositório

```bash
git clone https://github.com/kleberbarros9/bazar-api-node-posweb.git
cd bazar-api-node-posweb
```

### Instalar Dependências

```bash
npm install
```

### Executar a Aplicação

```bash
npm run dev
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
NODE_ENV=development
MONGO_URL='your_mongo_db_connection_string'
PRIVATE_KEY='your_private_key'
```

## Rotas

### Rotas para Usuários

#### Registro de Usuário

- **Método:** `POST`
- **Rota:** `/users/register`
- **Descrição:** Registra um novo usuário.
- **Parâmetros:**
  - `name` (string) - Nome do usuário.
  - `email` (string) - Email do usuário.
  - `password` (string) - Senha do usuário.
  - `confirmPassword` (string) - Confirmação da senha.
  - `phone` (string) - Telefone do usuário.
  - `address` (string) - Endereço do usuário.

#### Login de Usuário

- **Método:** `POST`
- **Rota:** `/users/login`
- **Descrição:** Realiza o login de um usuário.
- **Parâmetros:**
  - `email` (string) - Email do usuário.
  - `password` (string) - Senha do usuário.

#### Obter Usuário Atual

- **Método:** `GET`
- **Rota:** `/users/currentUser`
- **Descrição:** Retorna os dados do usuário autenticado.
- **Parâmetros:** Nenhum

#### Atualizar Usuário

- **Método:** `PUT`
- **Rota:** `/users/currentUser`
- **Descrição:** Atualiza os dados do usuário autenticado.
- **Parâmetros:**
  - `name` (string) - Nome do usuário.
  - `email` (string) - Email do usuário.
  - `password` (string) - Senha do usuário.
  - `confirmPassword` (string) - Confirmação da senha.
  - `phone` (string) - Telefone do usuário.
  - `address` (string) - Endereço do usuário.
  - `image` (file) - Imagem do usuário (opcional).

### Rotas para Produtos

#### Criar Produto

- **Método:** `POST`
- **Rota:** `/products`
- **Descrição:** Cria um novo produto.
- **Parâmetros:**
  - `name` (string) - Nome do produto.
  - `description` (string) - Descrição do produto.
  - `state` (string) - Estado do produto (good, fair, bad).
  - `purchased_at` (date) - Data de compra do produto.
  - `images` (array of files) - Imagens do produto.

#### Listar Produtos

- **Método:** `GET`
- **Rota:** `/products`
- **Descrição:** Lista os produtos disponíveis.
- **Parâmetros:**
  - `page` (integer) - Número da página (opcional, padrão: 1).
  - `limit` (integer) - Limite de produtos por página (opcional, padrão: 10).

#### Mostrar Produto por ID

- **Método:** `GET`
- **Rota:** `/products/showProductBy/:id`
- **Descrição:** Exibe os detalhes de um produto específico com base no ID fornecido.
- **Parâmetros:** 
  - `id` (string) - ID do produto.

#### Mostrar Produtos do Usuário

- **Método:** `GET`
- **Rota:** `/products/showUserProducts`
- **Descrição:** Lista os produtos do usuário autenticado.
- **Parâmetros:** Nenhum

#### Mostrar Produtos do Receptor

- **Método:** `GET`
- **Rota:** `/products/showRecieverProducts`
- **Descrição:** Lista os produtos recebidos pelo usuário autenticado.
- **Parâmetros:** Nenhum

#### Atualizar Produto

- **Método:** `PUT`
- **Rota:** `/products/:id`
- **Descrição:** Atualiza os dados de um produto.
- **Parâmetros:**
  - `name` (string) - Nome do produto.
  - `description` (string) - Descrição do produto.
  - `state` (string) - Estado do produto.
  - `purchased_at` (date) - Data de compra do produto.
  - `images` (array of files) - Imagens do produto.

#### Deletar Produto

- **Método:** `DELETE`
- **Rota:** `/products/:id`
- **Descrição:** Deleta um produto.
- **Parâmetros:**
  - `id` (string) - ID do produto.

#### Agendar Doação

- **Método:** `PATCH`
- **Rota:** `/products/schedule/:id`
- **Descrição:** Agenda uma doação para o produto.
- **Parâmetros:**
  - `id` (string) - ID do produto.

#### Concluir Doação

- **Método:** `PATCH`
- **Rota:** `/products/concludeDonation/:id`
- **Descrição:** Conclui a doação de um produto.
- **Parâmetros:**
  - `id` (string) - ID do produto.

---

Sinta-se à vontade para contribuir com este projeto enviando pull requests ou abrindo issues no repositório.

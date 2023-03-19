# Gerenciador de partidas de futebol

---

## Descrição

Este é um projeto de um site informativo sobre partidas e classificações de futebol, desenvolvido por [Júnior Carvalho](https://www.linkedin.com/in/juniorcarvalh0/) que seguiu os princípios SOLID e TDD usando Programação Orientada a Objetos. O objetivo é fornecer uma aplicação completa e integrada, consumindo uma base de dados e oferecendo uma API REST para ser consumida pelo front-end.

---

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Docker e Docker Compose](https://www.docker.com/)
- [JWT](https://jwt.io/) (Autenticação)
- [Mocha, Chai e Sinon](https://mochajs.org/) (Testes)
- [ESLint](https://eslint.org/) (Padronização de código)
- [MySQL](https://www.mysql.com/) (Banco de dados)

---

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Instalação

1. Clone o repositório

```sh
git clone git@github.com:jun1orcarvalh0/football-match-manager.git
```

2. Entre na pasta do projeto

```sh
cd football-match-manager
```

3. Instale as dependências

> Este comando irá instalar as dependências do front-end e do back-end simultaneamente (pode demorar um pouco).

```sh
npm install
```

4. Após a instalação das dependências, rode um dos comandos abaixo:

> Para rodar o projeto em modo de desenvolvimento:

```sh
npm run compose:up:dev
```

> Para rodar o projeto em modo de produção:

```sh
npm run compose:up
```

> NOTA: Os comandos estão descritos no arquivo `package.json` na raiz do projeto.

5. Acesse o site

> O site estará disponível em [http://localhost:3000](http://localhost:3000)

> A API estará disponível em [http://localhost:3001](http://localhost:3001)

> O banco de dados estará disponível em [http://localhost:3002](http://localhost:3002)

---

## Como rodar os testes

### Acessando o container

```sh
docker exec -it app_backend sh
```

### Rodando os testes

```sh
npm run test
```

---

## Documentação da API

### Autenticação

- `/login` POST - Autentica o usuário e retorna um token JWT.
- `/login/validate` GET - Valida o token JWT e retorna o tipo de usuário (admin ou user).
- `/teams` GET - Retorna todos os times cadastrados
- `/teams/:id` GET - Retorna um time por ID
- `/matches` GET - Retorna todas as partidas cadastradas
- `/matches` POST - Cadastra uma partida
- `/matches/:id` PATCH - Atualiza os gols de uma partida
- `/matches/:id/finish` PATCH - Finaliza uma partida
- `/leaderboard` GET - Retorna a classificação geral
- `/leaderboard/home` GET - Retorna a classificação do time da casa
- `/leaderboard/away` GET - Retorna a classificação do time visitante

---

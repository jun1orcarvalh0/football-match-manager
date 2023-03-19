# Football match manager

---

## Description

This is a project for an informative website about football matches and rankings, developed by [Júnior Carvalho](www.linkedin.com/in/juniorcarvalh0/) following the SOLID and TDD principles. The objective is to provide a complete and integrated application, consuming a database and offering a REST API to be consumed by the front-end.

---

## Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Docker and Docker Compose](https://www.docker.com/)
- [JWT](https://jwt.io/) (Authentication)
- [Mocha, Chai and Sinon](https://mochajs.org/) (Tests)
- [ESLint](https://eslint.org/) (Code Standardization)
- [MySQL](https://www.mysql.com/) (Database)

---

## How to rotate

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository

```bash
git clone git@github.com:jun1orcarvalh0/football-match-manager.git
```

2. Enter the project folder

```bash
cd football-match-manager
```

3. Install dependencies

> This command will install the frontend and backend dependencies simultaneously (may take a while).

```bash
npm install
```

4. After installing the dependencies, run one of the commands below:

> To run the project in development mode:

```bash
npm run compose:up:dev
```

> To run the project in production mode:

```bash
npm run compose:up
```

> NOTE: The commands are described in the `package.json` file in the root of the project.

5. Access the website

> The website will be available at [http://localhost:3000](http://localhost:3000)

> The API will be available at [http://localhost:3001](http://localhost:3001)

> The database will be available at [http://localhost:3002](http://localhost:3002)

---

## How to run the tests

### Accessing the container

```bash
docker exec -it app_backend sh
```

### Running the tests

```bash
npm run test
```

---

## API Documentation

### Authentication

- `/login` POST - Authenticates the user and returns a JWT token.
- `/login/validate` GET - Validates the JWT token and returns the user type (admin or user).
- `/teams` GET - Returns all registered teams
- `/teams/:id` GET - Returns a team by ID
- `/matches` GET - Returns all registered matches
- `/matches` POST - Registers a match
- `/matches/:id` PATCH - Updates the goals of a match
- `/matches/:id/finish` PATCH - Finishes a match
- `/leaderboard` GET - Returns the overall ranking
- `/leaderboard/home` GET - Returns home team ranking
- `/leaderboard/away` GET - Returns away team ranking

---

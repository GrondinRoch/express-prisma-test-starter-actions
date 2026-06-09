# express-prisma-test-starter

Projet Express.js de base pour apprendre les tests avec Jest, Supertest et Prisma.

Le projet utilise Prisma avec MariaDB/MySQL. Le schema actuel gere des commandes (`orders`) et leurs lignes (`items`).

## Installation

```bash
npm install
```

Copier puis completer les variables d'environnement :

```bash
cp .env.example .env
```

Exemple de configuration :

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=password
DB_NAME=test_starter_db
DB_PORT=3306
DATABASE_URL="mysql://root:password@127.0.0.1:3306/test_starter_db"
```

## Commandes

```bash
npm run dev
npm start
npm test
```

## Commandes Prisma

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
npx prisma studio
npx prisma format
```

Pour demarrer sur une base vide :

```bash
npx prisma db push
npm run prisma:seed
```

Le seed supprime les anciennes donnees `items` et `orders`, puis insere 3 commandes de demonstration.

## Base de test

Par defaut, `npm test` charge `.env`, donc les tests utilisent la meme base que le developpement.

Pour utiliser une base separee, creer un fichier `.env.test` :

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=password
DB_NAME=test_starter_db_test
DB_PORT=3306
DATABASE_URL="mysql://root:password@127.0.0.1:3306/test_starter_db_test"
```

Puis lancer les commandes avec ce fichier :

```bash
npx dotenv -e .env.test -- npx prisma db push
npx dotenv -e .env.test -- npx prisma db seed
npx dotenv -e .env.test -- npm test
```

## Configuration Jest

La configuration Jest est dans `package.json` :

```json
"jest": {
  "testEnvironment": "node",
  "verbose": true,
  "testMatch": [
    "**/tests/**/*.test.js"
  ],
  "setupFiles": [
    "<rootDir>/tests/setup.js"
  ]
}
```

Le fichier `tests/setup.js` est execute avant les tests. Il charge les variables d'environnement avec `dotenv/config`.

## Organisation des tests

`tests/unit` contient les tests unitaires pour une fonction ou une classe isolee.

Exemple : tester une fonction de calcul sans lancer Express ni acceder a la base de donnees.

`tests/integration` contient les tests d'integration pour verifier que plusieurs parties fonctionnent ensemble.

Exemple : tester une requete Prisma avec une base de donnees de test.

`tests/api` contient les tests des routes HTTP de l'API.

Exemple : appeler une route Express avec Supertest et verifier la reponse.

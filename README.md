# StudentCourseAPI

Projet pédagogique pour le module **Tests et Qualité** à l’Efrei.

## Contexte ⚙

Ce projet back-end (Node.js/Express) sert de base pour l’évaluation finale du module.  
L’objectif est d’améliorer la qualité du code et la couverture de tests à partir d’un projet existant.

## Fonctionnalités 🧰

- Gestion des étudiants et des cours (création, modification, suppression, inscription).
- Règles métier : unicité email/titre, pagination, recherche, suppression protégée, etc.
- API REST documentée avec Swagger.

## Technologies 🔨
- Nodejs / Javascript
- Expressjs (API Rest)
- Jest / Supertest (tests)
- Husky (CI)

## Démarrage rapide ⚡

Dans ce projet, j'utilises [pnpm](https://pnpm.io/) comme installateur de packages. Pour une installer simplifier, je conseil de l'installer !

1. Installer les dépendances
```sh
npm install
# ou
pnpm i
```

2. Variables d'environnement

```sh
cp .env.example .env # copier
```

puis rentrez votre clé API:
```sh
# API
PORT=3000

# Codacy (analyse de code) https://app.codacy.com/gh/Math-Vov13/matheo-tests/settings/integrations
CODACY_PROJECT_TOKEN=your-token-here
```

3. Une fois tout cela fait, vous pourrez lancer serveur

```sh
npm run dev # lancer le serveur (avec nodemon)
# ou
pnpm dev
```

## Ressources 📚
### Chemins API
Base de l'API http://localhost:3000
1. Documentation Swagger `/api-docs`
2. Cours `/courses`
3. Elèves `/students`

### Formatage du code et linter

Linter:

```sh
npm run lint
```

Formatage:

```sh
npm run format
```

### Tests

Lancer les tests

```sh
npm run test
# ou
npm run test:coverage
```

Lancer l'analyse de script Codacy ([avec clé API](https://www.codacy.com/signup-codacy))

```sh
export CODACY_PROJECT_TOKEN="your-token-here" # Linux/Macos - bash
# ou
$env:CODACY_PROJECT_TOKEN = "your-token-here" # Windows - Powershell

npm run report:codacy
```

---

### liens utile

- **Eslint & prettier :** https://formation-web-33.fr/configurer-eslint-et-prettier-pour-un-code-propre-en-javascript/
- **Auto-Swagger :** https://medium.com/@im_AnkitTiwari/swaggerizing-your-node-js-rest-api-a-step-by-step-guide-267255bf8bbe
- **Codacy :** https://app.codacy.com/gh/Math-Vov13/matheo-tests/settings/integrations

## Auteur
- Mathéo Vovard
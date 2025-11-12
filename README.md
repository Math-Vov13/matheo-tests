# StudentCourseAPI

Projet pédagogique pour le module **Tests et Qualité** à l’Efrei.

## Contexte

Ce projet back-end (Node.js/Express) sert de base pour l’évaluation finale du module.  
L’objectif est d’améliorer la qualité du code et la couverture de tests à partir d’un projet existant.

## Objectifs pour les étudiants

- **Appliquer les standards de qualité** : linters (ESLint), formatage (Prettier), bonnes pratiques.
- **Intégrer des outils d’analyse statique** : exemple : SonarQube, Codacy.
- **Réaliser une revue de code collaborative** et la documenter.
- **Mettre en place une suite de tests automatisés** (unitaires et intégration) avec Jest, Mocha ou Cypress.
- **Intégrer les tests dans une pipeline CI/CD** (GitHub Actions).
- **Gérer la couverture de tests**.
- **Compléter la documentation technique** : installation, architecture, endpoints API, guides d’usage.
- **Finaliser la documentation Swagger** (manuelle ou automatique).
- **Fournir un dépôt Git propre, structuré et commenté**.

## Fonctionnalités

- Gestion des étudiants et des cours (création, modification, suppression, inscription).
- Règles métier : unicité email/titre, pagination, recherche, suppression protégée, etc.
- API REST documentée avec Swagger.

## À faire

- [ X ] Corriger et compléter les tests existants.
- [ ] Ajouter de nouveaux tests pour améliorer la couverture.
- [ X ] Mettre en place ESLint et Prettier.
- [ ] Intégrer la vérification de qualité et les tests dans la CI.
- [ X ] Finaliser la documentation Swagger.
- [ X ] Intégrer Codacy comme outil d’analyse statique
- [ ] Ajouter un template de Pull Request (.github/pull_request_template.md).
- [ ] Produire une Pull Request bien documentée avec des messages de commits pertinents.
- [ ] Rédiger une documentation technique complète (Markdown ou générateur).
- [ X ] Fournir un dépôt Git propre, lisible et bien organisé.

## Démarrage rapide

Variables d'environnement

```sh
cp .env.example .env
```

Installation et lancement du serveur

```sh
npm install # installer les packages
npm run dev # lancer le serveur (avec nodemon)
```

- Accès à la documentation Swagger : `/api-docs`

### Codebase écriture

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

### liens

- https://formation-web-33.fr/configurer-eslint-et-prettier-pour-un-code-propre-en-javascript/
- https://medium.com/@im_AnkitTiwari/swaggerizing-your-node-js-rest-api-a-step-by-step-guide-267255bf8bbe
- https://app.codacy.com/gh/Math-Vov13/matheo-tests/settings/integrations

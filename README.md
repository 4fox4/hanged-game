# hanged-game
A kind of Hangman game based on the translation of french words

## Install and Start app

### Required

- node
- npm

### Install dependencies
```
npm install
```

### Start build & serve project
```
npm start
```
This command builds project then start server

### Start build & serve for development
```
npm run dev
```
This command builds project then start server with hot load

### Build project
```
npm run build
```
This command builds only the project

### Start server only
```
npm run server
```
This command only serves the project
 
 
#
 
 
## Fonctionnement technique

### Tech stack

- Back-end
  - Node.js / Express.js
- Front-end
  - React / Babel / Webpack
- DB
  - MongoDB

### Details & fonctionnement

**Base de donnée MongoDB** peuplée de 500 verbes français, connectée à un **serveur Node.js / Express** (/server.js).

Ce même serveur écoute sur le port 3000, et répond aux méthodes GET avec les requêtes sur:

• '/' pour servir l'app développée en **React** (/src), transpillée avec **BabelJS** (JS ES6) au travers de **Webpack** (loaders) qui rendra en sortie un fichier app.js minifié constitué de l'intégralité de l'app React ainsi que l'index.html (/app).

• '/word' qui renverra en réponse un objet "words" contenant le mot en français, récupéré sur la base de donnée MongoDB de manière aléatoire, ainsi que la traduction en anglais de ce mot, recupérée depuis une **API de traduction (Yandex Translate)**.
  
La réponse à cette requete sera de la forme {fr: String, en: String}.
Une fois, récupéré sur l'app coté client, la reponse sera traitée et mettra à jours certains états de composants.

Cela engendrera une mise à jour des composants liés.

### Axes d'améliorations

- [ ] Niveaux par mots en base de donnée. ex: difficulté: 0, 1 ou 2 (En repeuplant la DB).
- [ ] Coefficient de réussite par mots (via POST sur serveur Node, influant sur le niveau de difficulté par exemple)
- [ ] Sauvegarde locale des scores de reussite (via localStorage).
- [ ] Le support d'autres langues (en changeant lavaleur de la clé "lang" de la requete sur l'API de traduction).
- [ ] Le support du mode "Hors connexion", permettant de pouvoir utiliser l'appli sans connexion réseau (via les service worker, en gardant en mémoire dans le localStorage un certain nombre de mots. Les service worker permettront d'intercepter les requetes et de pouvoir y repondre en local).

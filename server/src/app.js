// importations ...
const express = require('express');
const session = require('express-session');
const path = require('path');
const apiRouter = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const app = express();

// Configuration de express-session
app.use(session({
    secret: 'technoweb rocks',
    resave: true,
    saveUninitialized: false
}));

// Utilisation du routeur API pour gérer les requêtes vers /api
app.use('/api', apiRouter);

// Démarre le serveur
const server = app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

// Exporte le serveur pour les tests unitaires ou autres utilisations
module.exports = server;

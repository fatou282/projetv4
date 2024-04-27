// importations ...
const express = require('express');
const session = require('express-session');
const path = require('path');
const apiRouter = require('./api.js');
const { MongoClient } = require('mongodb'); // Importe le client MongoDB

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const app = express();

// Configuration de express-session ; pour gérer les sessions utilisateur 
app.use(session({
    secret: 'technoweb rocks',
    resave: true,
    saveUninitialized: false
}));

// Utilisation du routeur API pour gérer les requêtes vers /api
app.use('/api', apiRouter); // concrètement, toutes les routes définies dans api.js, seront accessibles à partir de /api

// Démarre le serveur
const server = app.listen(3000, async () => {
    console.log('Serveur démarré sur le port 3000');

    
    const url = "mongodb://localhost/Organizasso"; // URL de connexion MongoDB avec la base de données spécifiée
    const client = new MongoClient(url); // Créez un nouveau client MongoDB


    try {
        // Connexion à MongoDB
        await client.connect();
        console.log("Connexion à la base de données MongoDB réussie");
        app.use('/api', init(client.db('Organizasso'))); // le routeur API est utilisé pour gérer les requêtes vers /api, et il est initialisé avec la bd
        //Cette connexion permet au serveur d'interagir avec la bd pour récupèrer et stocker des données

        // Faites ce que vous avez à faire avec la base de données...
        await faitDesChoses(client);
    } 
    catch (erreur) {
        console.error("Erreur lors de la connexion à la base de données MongoDB :", erreur);
    } 
    finally { //ce bloc est toujours exécuté, que ce soit en cas de réussite ou d'échec de la connexion à la bd
        // Fermeture de la connexion à MongoDB
        await client.close();
        console.log("Connexion à la base de données MongoDB fermée");
    }
});

// Exporte le serveur pour les tests unitaires ou autres utilisations
module.exports = server;

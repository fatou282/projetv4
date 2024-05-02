// Importations .....
const express = require('express');
const session = require('express-session');
const path = require('path');
const { MongoClient } = require('mongodb'); // Importe le client MongoDB
const init = require('./api.js'); // Importe la fonction init de api.js

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const app = express();
let client; // Déplacer la déclaration de la variable client ici
// Middleware pour gérer les demandes CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Autoriser l'accès depuis n'importe quelle origine
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuration de express-session ; pour gérer les sessions utilisateur 
app.use(session({
    secret: 'technoweb rocks',
    resave: true,
    saveUninitialized: false
}));

// Utilisation de la fonction init pour gérer les requêtes vers /api
// Démarre le serveur
const server = app.listen(4000, async () => {
    console.log('Serveur démarré sur le port 4000');

    
    const url = "mongodb://localhost/Organizasso"; // URL de connexion MongoDB avec la base de données spécifiée
    client = new MongoClient(url); // Initialiser la variable client

    try {
        // Connexion à MongoDB
        await client.connect();
        console.log("Connexion à la base de données MongoDB réussie");
        
        await faitDesChoses(client);
    } 
    catch (erreur) {
        console.error("Erreur lors de la connexion à la base de données MongoDB :", erreur);
    } 
  
    
});

// Gestionnaire d'événements pour SIGINT


async function faitDesChoses(client) {
    console.log('on lance init');
    const db = client.db(); // Récupère la référence de la base de données
    const router = init(db);
    // Utilise le routeur pour gérer les requêtes vers /api
    app.use('/api', router);
    // Exemple : récupérer tous les utilisateurs de la collection "users"
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();
    console.log("Liste des utilisateurs :", users);
}

// Exporte le serveur pour les tests unitaires ou autres utilisations
module.exports = server;

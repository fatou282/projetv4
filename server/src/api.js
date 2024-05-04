const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const Requests = require("./entities/requests.js");
const session = require('express-session');

function init(db) {
    console.log('init est lancé');
    const router = express.Router();

    router.use(express.json());

    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // Autoriser l'accès depuis n'importe quelle origine
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path); //pour print la méthode (POST, GET..) et le chemin de l'URL demandé dans la requete
        console.log('Body', req.body); // et ce que contient la req
        next();
    });
    console.log('jusquici tout va bien');

    const users = new Users(db); //création d'une instance de la classe Users + connexion à la bd

    console.log('user check');

    router.post("/user/register", async (req, res) => {
        console.log('bien rentré dans post');
        try {
            const { name, lastName, username, email, password } = req.body;
            console.log('tout est bien recupéré');
            if (!name || !lastName || !username || !email || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "Veuillez fournir tous les champs nécessaires pour l'inscription"
                });
            }
    

            //l'utilisateur n'a jamais été inscrit
            const newUser = await users.create(name, lastName, username, email, password);
    
            // Réponse de succès
            return res.status(201).json({
                status: 201,
                message: "Inscription réussie !",
                user: newUser // Renvoi des données de l'utilisateur nouvellement créé si nécessaire
            });
            
            
        } catch (error) {
            // Gestion des erreurs
            return res.status(500).json({
                status: 500,
                message: "Erreur lors de l'inscription",
                error: error.message
            });
        }
    });
    router.post("/user/login", async (req, res) => {

        console.log("fonction Login bien appelée")
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "Requête invalide : nom d'utilisateur et mot de passe nécessaires"
                });
            }
    
            // Vérifier si l'utilisateur existe déjà
            const userExists = await users.exists(username);
            if (!userExists) {
                console.log("L'utilisateur n'existe pas dans la bdd");
                return res.status(404).json({
                    status: 404,
                    message: "Nom d'utilisateur invalide"
                });
            }
            const userData = await users.getUserDataByUsername(username);

            // Envoyer une réponse 200 OK si l'utilisateur existe
            return res.status(200).json({
                status: 200,
                message: "Utilisateur trouvé",
                user: userData
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Erreur interne",
                details: error.message
            });
        }
    });


    router.route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
            try {
                const user = await users.get(req.params.user_id);
                if (!user) {
                    res.sendStatus(404);
                } else {
                    res.send(user);
                }
            } catch (e) {
                res.status(500).send(e);
            }
        })
        .delete((req, res) => res.send(`delete user ${req.params.user_id}`));

    router.post("/user", (req, res) => {
        const { username, email, password, lastname, firstname } = req.body;
        if (!username || !email || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(username, email, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });



    //-------------------------------------------------------------------------------------------------------//

    const messages = new Messages(db);

    router.get("/message/:message_id", async (req, res) => {
        try {
            const message = await messages.getMessage(req.params.message_id);
            if (!message) {
                return res.sendStatus(404);
            }
            return res.send(message);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    router.post("/message", async (req, res) => {
        
        const {author, content, date} = req.body ; 
        if (!author|| !content|| !date) {
            res.status(400).send("Missing fields");
        } else {
            messages.create(author, content, date)
                .then((message_id) => res.status(201).send({ id: message_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    router.delete("/message/:message_id", async (req, res) => {
        try {
            await messages.deleteMessage(req.params.message_id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    router.get("/messages", async (req, res) => {
        console.log("route bien trouvée");

        try {
            const allMessages = await messages.getAllMessages();
            console.log(allMessages);
            return res.send(allMessages);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    //-------------------------------------------------------------------------------------------------------//
   
    const requests = new Requests(db); // Création d'une instance de la classe Requests, sans ajouter default

    router.route("/request/:request_id")
        .get(async (req, res) => {
            try {
                const request = await requests.getRequest(req.params.request_id);
                if (!request) {
                    res.sendStatus(404);
                } else {
                    res.send(request);
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })
        .delete(async (req, res) => {
            try {
                await requests.deleteRequest(req.params.request_id);
                res.sendStatus(204);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

    router.post("/request/:request_id/accept", async (req, res) => {
        try {
            await requests.acceptRequest(req.params.request_id);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get("/requests", async (req, res) => {
        try {
            const allRequests = await requests.getAllRequests();
            res.send(allRequests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}
module.exports = init;

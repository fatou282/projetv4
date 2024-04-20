const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const Requests = require("./entities/requests.js");
const session = require("express-session");

function init(db) {
    const router = express.Router();

    // Utilisation du JSON middleware
    router.use(express.json());

    // Logger simple pour les requêtes vers ce routeur
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    const users = new Users.default(db);

    // Route pour gérer l'authentification
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            
            // Vérification de la validité de la requête HTTP
            if (!login || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "Requête invalide : login et password nécessaires"
                });
            }
            
            // Vérification de l'existence de l'utilisateur
            if (!await users.exists(login)) {
                return res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
            }

            // Vérification du mot de passe
            let userId = await users.checkPassword(login, password);
            if (userId) {
                // Authentification réussie : création d'une nouvelle session
                req.session.regenerate(function (err) {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    } else {
                        // Nouvelle session créée avec succès
                        req.session.userId = userId;
                        return res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
            } else {
                // Identifiants invalides : destruction de la session et envoi d'une erreur
                req.session.destroy((err) => {});
                return res.status(403).json({
                    status: 403,
                    message: "login et/ou le mot de passe invalide(s)"
                });
            }
        } catch (e) {
            // Gestion des erreurs
            return res.status(500).json({
                status: 500,
                message: "Erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });
    router.delete("/user/logout", async (req, res) => {
        try {
            // Vérifier si l'utilisateur est connecté
            if (!req.session || !req.session.userId) {
                return res.status(401).json({
                    status: 401,
                    message: "Utilisateur non connecté"
                });
            }

            // Appeler la méthode de déconnexion de la classe Users
            await users.logout(req);

            // Déconnexion réussie : retourner une réponse
            return res.status(200).json({
                status: 200,
                message: "Déconnexion réussie"
            });
        } catch (error) {
            // Gérer les erreurs
            return res.status(500).json({
                status: 500,
                message: "Erreur lors de la déconnexion de l'utilisateur",
                details: error.message
            });
        }
    });

    // Autres routes pour la gestion des utilisateurs
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
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    router.put("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    
    const messages = new Messages.default(db);

    // Route pour afficher un message spécifique
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

    // Route pour créer un nouveau message
    router.post("/message", async (req, res) => {
        try {
            const messageData = req.body;
            const newMessage = await messages.createMessage(messageData);
            return res.status(201).json(newMessage);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    // Route pour supprimer un message
    router.delete("/message/:message_id", async (req, res) => {
        try {
            await messages.deleteMessage(req.params.message_id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    // Route pour récupérer tous les messages
    router.get("/messages", async (req, res) => {
        try {
            const allMessages = await messages.getAllMessages();
            return res.send(allMessages);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
    const requests = new Requests.default(db); // Création d'une instance de la classe Requests

    // Route pour gérer l'authentification (non modifiée)

    // Route pour gérer la déconnexion (non modifiée)

    // Autres routes pour la gestion des utilisateurs (non modifiée)

    // Routes pour gérer les demandes
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

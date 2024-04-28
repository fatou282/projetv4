const express = require("express");
const Users = require("./entities/users.js"); // importe la classe Users depuis le fichier users.js
const Messages = require("./entities/messages.js");
const Requests = require("./entities/requests.js");
const session = require("express-session"); 

// cette fonction initialise le routeur de l'API
function init(db) {
    const router = express.Router(); //on crée le routeur Express

    // Utilisation du JSON middleware pour avoir accès au corps des requêtes JSON
    router.use(express.json());

    //premier middleware à s'exécuter ; il s'applique à toutes les requetes envoyées au serveur Express. Il permet l'accès à l'API complet!
    router.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // d'accéder à notre API depuis n'importe quelle origine ( '*' ) 
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
        next();
    });

    // Logger simple pour les requêtes vers ce routeur
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path); //permet de print la méthode (GET,POST..) et le chemin de l'URL demandé dans la requête
        console.log('Body', req.body); // et ce que contient le corps de la requête
        next();
    });

    //-------------------------------------------------------------------------------------------------------//

    const users = new Users.default(db); //on crée une instance de la classe Users et on la connecte à la bd

    // Route pour gérer l'authentification des utilisateurs
    router.post("/api/user/login", async (req, res) => {
        try {
            // on récupère les informations de connexion à partir du corps de la requête
            const { login, password } = req.body;
            
            // Vérification de la validité des infos de connexion de la requête HTTP
            if (!login || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "Requête invalide : login et password nécessaires"
                });
            }
            
            // Vérification de l'existence de l'utilisateur
            if (!await users.exists(login)) { //exists retourne true ou false
                return res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
            }

            // Vérification du mot de passe
            let userId = await users.checkPassword(login, password);
            if (userId) {
                // Authentification réussie : création d'une nouvelle session
                req.session.regenerate(function (err) { //regenerate() détruit toute session existante et en crée une nouvelle
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    } else {
                        // Nouvelle session créée avec succès
                        // La session permet de gérer l'authentification de l'utilisateur ; elle stocke les infos du user actuellement connecté sur le site
                        req.session.userId = userId; //L'ID de l'utilisateur est stocké dans la session nouvellement créée
                        return res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté" // renvoie une réponse au frontend, (un code de statut HTTP 200 pour indiquer que la connexion a réussi,+ autre information pertinente à renvoyer à l'utilisateur)
                        });
                    }
                });
            } else {
                // Identifiants invalides : destruction de la session et envoi d'une erreur
                req.session.destroy((err) => {});
                return res.status(403).json({
                    status: 403,
                    message: "Login et/ou le mot de passe invalide(s)"
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
    router.delete("/api/user/logout", async (req, res) => {
        try {
            // On vérifie avant tout si l'utilisateur est connecté
            if (!req.session || !req.session.userId) {
                return res.status(401).json({
                    status: 401,
                    message: "Utilisateur non connecté"
                });
            }

            // L'utilisateur est connecté : on appelle la méthode de déconnexion de la classe Users
            await users.logout(req); // il faut détruire la session avec la méthode destroy

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
    router.route("/api/user/:user_id(\\d+)") //route permettant de récupérer les informations d'un utilisateur (GET), par ex. lorsque le user veut voir son propre profil, le frontend va envoyer une requête à cette route avec son id
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
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`)); //permet de supprimer un utilisateur en fonction de son ID, si le user voulait supprimer son compte


    router.post("/api/user", (req, res) => { // put ou post ?
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

    const messages = new Messages.default(db);

    // Route pour afficher un message spécifique en fonction de son ID (par ex, si on veut chercher un message spécifique via la barre de recherches)
    router.get("/api/message/:message_id", async (req, res) => {
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
    router.post("/api/message", async (req, res) => { // quand le user rédige un new msg ; les données de ce msg sont envoyées via la requête pour l'enregistrer dans la bd
        try {
            const messageData = req.body;
            const newMessage = await messages.createMessage(messageData);
            return res.status(201).json(newMessage); // renvoie une réponse HTTP avec un statut de code 201 (Créé) et envoie un objet JSON en tant que corps de la réponse ; Une fois reçues, le client peut extraire les données de la réponse JSON et les afficher dans l'interface utilisateur de manière structurée

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    // Route pour supprimer un message
    router.delete("/api/message/:message_id", async (req, res) => { //quand le user souhaite supprimer un de ses propres messages
        try {
            await messages.deleteMessage(req.params.message_id);
            return res.sendStatus(204);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    // Route pour récupérer tous les messages
    router.get("/api/messages", async (req, res) => { //si le user veut afficher tous ses messages
        try {
            const allMessages = await messages.getAllMessages();
            return res.send(allMessages);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    //-------------------------------------------------------------------------------------------------------//
    const requests = new Requests.default(db); // Création d'une instance de la classe Requests

    // Route pour gérer l'authentification (non modifiée)

    // Route pour gérer la déconnexion (non modifiée)

    // Autres routes pour la gestion des utilisateurs (non modifiée)

    // Routes pour gérer les demandes
    router.route("/api/request/:request_id")
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

    router.post("/api/request/:request_id/accept", async (req, res) => {
        try {
            await requests.acceptRequest(req.params.request_id);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get("/api/requests", async (req, res) => {
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

import React, { useState } from 'react';
import axios from 'axios'; // Importer Axios
import '../styles/Login.css';
import {Link} from 'react-router-dom'


function Login({history}) {
    
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    axios.defaults.baseURL = 'http://localhost:4000';

    async function handleSubmit(event) {
        event.preventDefault();
        const user = { identifier, password };

        try {
            // Envoi des données de connexion au serveur avec Axios
            const response = await axios.post('/api/users/login', user);
            
            // Vérifier si la réponse est OK (status 200)
            if (response.status !== 200) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }

            // Redirection vers la page du forum après connexion réussie
            history.push('/forum');
        } 
        catch (error) {
            // En cas d'erreur, afficher le message d'erreur à l'utilisateur
            setError(error.message);
        }
    }

    function handleChangeIdentifier(event) {
        setIdentifier(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <div>
            <h2>Connexion</h2>
            {error && <div className="error">{error}</div>}

            <form 
            onSubmit={handleSubmit} 
            className="login-form">
                <label htmlFor='identifier'>Identifiant ou adresse e-mail : </label>
                <input
                    id='identifier'
                    onChange={handleChangeIdentifier}
                    type="text"
                    value={identifier}
                />

                <br />

                <label htmlFor='password'>Mot de passe :</label>
                <br />
                <input
                    id="password"
                    onChange={handleChangePassword}
                    type="password"
                    value={password}
                />
                <br />
                <button type="submit">Se connecter</button>
            </form>
            <Link to='/signin'>Nouveau chez OrganizAsso ? Créer votre compte</Link>
        </div>
    );
}

export default Login;

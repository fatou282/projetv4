import React, { useState } from 'react';
import axios from 'axios'; // Importer Axios
import '../styles/Login.css';

function Login({history}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    axios.defaults.baseURL = 'http://localhost:4000';
    async function handleSubmit(event) {
        event.preventDefault();
        const currentUser = { username, password };
        try {
            const response = await axios.post('/api/user/login', currentUser);
            // Vérifier si la réponse est OK (status 200)
            if (response.status !== 200) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }
        
            // Récupérer les données de l'utilisateur depuis la réponse
            const userData = response.data.user;
 history.push({
                pathname: '/forum',
                state: { currentUser: userData }
            });
            // Appeler la fonction de connexion passée en tant que prop depuis MainPage
        } catch (error) {
            setError(error.message);
        }
    }

    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <div>
            <h2>Connexion</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor='login'>Identifiant :</label>
                <input
                    id='login'
                    onChange={handleChangeUsername}
                    type="text"
                    value={username}
                />

                <br />

                <label htmlFor='pass'>Mot de passe:</label>
                <br />
                <input
                    id="pass"
                    onChange={handleChangePassword}
                    type="password"
                    value={password}
                />
                <br />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;

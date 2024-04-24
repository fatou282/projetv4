import { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            // Envoi des données de connexion au serveur
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: username, password: password })
            });

            if (!response.ok) {
                // Si la réponse du serveur n'est pas OK, gérer l'erreur
                throw new Error('Identifiant ou mot de passe incorrect');
            }

            // Si la réponse est OK, mettre à jour l'état pour indiquer que l'utilisateur est connecté
            onLogin();
        } catch (error) {
            // En cas d'erreur, afficher le message d'erreur à l'utilisateur
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
                <label htmlFor='login'>Identifiant ou email:</label>
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

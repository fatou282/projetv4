import { useState } from 'react';
import '../styles/Login.css'
function Login({ login }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Dans ce code, Login reçoit login en tant que prop. Lorsque le formulaire est soumis, la fonction handleSubmit est appelée, qui exécute la logique de connexion et ensuite appelle la fonction login() passée en tant que prop. Cela mettra à jour l'état de connexion dans votre composant MainPage.
    function handleSubmit(event){
        event.preventDefault();
        const user = {username,login};
        login(user); // Appeler la fonction login passée en tant que prop
    }

    function handleChangeUsername(event){
        setUsername(event.target.value);
    }

    function handleChangePassword(event){
        setPassword(event.target.value);
    }

    return(
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor='login'>Identifiant ou email:</label>
                <input 
                    id='login'
                    onChange={handleChangeUsername}
                    type="text"
                    value={username} />  {/* Si vous supprimez value={login}, le champ de saisie n'affichera pas la valeur actuelle du state login, et donc il sera vide par défaut */}
                    
                
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
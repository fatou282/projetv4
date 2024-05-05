import { useState } from 'react';
import '../styles/SignIn.css';
import axios from 'axios';
import { Link } from "react-router-dom";


function SignIn({ history }) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    axios.defaults.baseURL = 'http://localhost:4000';
    function handleChange(e) {
        const { name, value } = e.target;
        switch(name) {
            case "name":
                setName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;  
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Avertissement : les deux mots de passe sont différents ! ");
            return;
        }

        try {
            const user = { name, lastName, username, email, password };

            console.log("User Data:", user);

            const response = await axios.post("/api/user/register", user);
            console.log("Inscription réussie ! ", response.data);
            history.push({
                pathname: '/forum',
                state: { currentUser: user }
            });        } catch (error) {
            console.log("Erreur lors de l'inscription", error);
        }
    }

    return (
        <div className='signin'>
            <h2>Inscription</h2> 
            <form className='signin-form' onSubmit={handleSubmit}>
                <label>Prénom</label> <label>Nom</label>
                <input type="text" name="name" value={name} onChange={handleChange} className='input-signin-name'/>
                <input type="text" name="lastName" value={lastName} onChange={handleChange} className='input-signin-lastName'/>

                <label>Identifiant</label>
                <input type="text" name="username" value={username} onChange={handleChange} className='input-signin-username'/>

                <label>E-mail</label>
                <input type="email" name="email" value={email} onChange={handleChange} className='input-signin-email'/>
                
                <label>Mot de passe</label>
                <input type="password" name="password" value={password} onChange={handleChange} className='input-signin-password'/>

                <label>Confirmer le mot de passe</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} className='input-signin-confirmpassword'/>

                <button type="submit">S'inscrire</button>
                <button type="reset">Annuler</button>
                <Link to="/login" >Vous avez déjà un compte ? Identifiez vous ici </Link>

            </form>
        </div>
    );
}

export default SignIn;

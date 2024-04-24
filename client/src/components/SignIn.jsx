import { useEffect, useState } from 'react';
import '../styles/SignIn.css'

function SignIn({login}){

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    function handleChange(e){
        //utilisé pour mettre à jour l'état des données lorsqu'elles changent
        const {name, value} = e.target;
        switch(name){
            case "name":
                setName(value); //permet de mettre à jour l'état correspondant (name, lastName, etc.) avec la valeur saisie par l'utilisateur (value)
                break;
            case "lastName":
                setLastName(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            

        }
        
    }

    function handleSubmit(event){
        event.preventDefault(); //empeche la page de se recharger après soumission du form
        const user = {name,lastName, username};
        login(user); //comme ça dès que le user s'inscrit, on le connecte dans le forum
    
    if(password !== confirmPassword){
        alert("Avertissement : les deux mots de passe sont différents ! ");
    }
    }
    return (
        <div className='signin'>
       <h2>Inscription</h2> 
        <form 
        className='signin-form'
        onSubmit={handleSubmit}>

            <label>Prénom</label> <label>Nom</label>
                <input type="text" name="name" value={name} onChange={handleChange}className='input-signin-name'/>
            
                <input type="text" name="lastName" value={lastName} onChange={handleChange} className='input-signin-lastName'/>
            

            <label>Pseudonyme</label>
            <input type="text" name="username" value={username} onChange={handleChange} className='input-signin-username'/>

            <label>Mot de passe</label>
            <input type="password" name="password" value={password} onChange={handleChange} className='input-signin-password'/>

            <label>Confirmer le mot de passe</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} className='input-signin-confirmpassword'/>

            <button type="submit">S'inscrire</button>
            <button type="reset">Annuler</button>
            



        </form>
        </div>
    )

}


export default SignIn;


function User({name, lastName, username}){
    return(
        <div>Informations sur l'utilisateur
            <p>Prénom : {name}</p>
            <p>Nom : {lastName}</p>
            <p>Username: {username}</p>
        </div>
    )
}

export default User;
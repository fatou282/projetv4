

function User({ name, lastName, username, isAdmin }) {
    return (
        <div>
            <p>Informations sur l'utilisateur :</p>
            <p>Prénom : {name}</p>
            <p>Nom : {lastName}</p>
            <p>Username : {username}</p>
            {isAdmin && <p>Statut : Administrateur</p>}
        </div>
    );
}

export default User;

import '../styles/Logout.css'
function Logout({logout}){
    return(
        <button
            onClick={logout} // Appeler la fonction de déconnexion lorsque le bouton est cliqué
            className="logout-button">
            Se déconnecter
        </button>
    )
}

export default Logout;
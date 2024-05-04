import '../styles/Logout.css'
import { Link } from 'react-router-dom';

import {Link} from 'react-router-dom'

function Logout({logout}){
    return(
        <Link to = '/signin'>
        <Link to='/login'>
        <button
            onClick={logout} // Appeler la fonction de déconnexion lorsque le bouton est cliqué
            className="logout-button">
            Se déconnecter
        </button>
        </Link>
        </Link>
    )
}

export default Logout;
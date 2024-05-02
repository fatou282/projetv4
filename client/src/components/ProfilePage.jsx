import User from "./User";
import { Link } from 'react-router-dom';

function ProfilePage(){

    

    return (
        <div>
            <h2>Bienvenue sur la page de profil</h2>
            <User/>
            <Link to="/forum">
         <button>Forum</button>
        </Link>
        </div>
    )
}


export default ProfilePage;
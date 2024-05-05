import '../styles/Logout.css';
import { Link } from 'react-router-dom';

function Logout({ logout }) {
    return (
        <Link to="/signin">
            <button
                onClick={logout}
                className="logout-button">
                Se déconnecter
            </button>
        </Link>
    );
}

export default Logout;

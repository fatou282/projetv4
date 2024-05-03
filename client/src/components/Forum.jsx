import MessageList from "./MessageList";
import Logout from "./Logout";
import '../styles/Forum.css';
import SearchMessages from "./SearchMessages";
import { Link } from 'react-router-dom';

function Forum({ login, logout, isConnected, currentUser, currentPage, setCurrentPage }) {
    function handleClickProfilePage() {
        setCurrentPage("profile_page");
    }

    return (
        <>
            <div className="message-page-panel">
                {/* Utilisez la balise Link pour créer un lien vers la page de profil */}
                <Link to="/profile">
                    <button>Page de profil</button>
                </Link>
            </div>
            <Logout />
            <div className="message-page-msg">
                <MessageList currentUser={currentUser} />
            </div>
            <div className="searchmessage">
                <SearchMessages />
            </div>
        </>
    )
}

export default Forum;

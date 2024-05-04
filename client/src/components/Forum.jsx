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
            <div className="message-page">
                {/* On utilise Link pour créer un lien vers la page de profil */}
                <Link to="/profile">
                    <button>Page de profil</button>
                </Link>
           

            <Logout />
            {/* <div className="message-page-msg"> */}
                <MessageList currentUser={currentUser} />
                <div className="searchmessage">
                    <SearchMessages />
                </div>
            </div>
            
        </>
    )
}

export default Forum;

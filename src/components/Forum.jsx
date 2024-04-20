import MessageList from "./MessageList";
import NavigationPanel from "./NavigationPanel";
import '../styles/Forum.css'

function Forum({login, logout, isConnected, currentUser,currentPage, setCurrentPage}){

    function handleClickProfilePage(){
        setCurrentPage("profile_page");
    }
    return (
        <>
            <div className="message-page-panel">
                <NavigationPanel login={login} logout={logout} isConnected={isConnected} currentPage={currentPage} /> 
                <button
                    onClick={handleClickProfilePage}
                >Page de profil</button>
            </div>
            
            <div className="message-page-msg">        
                <MessageList currentUser={currentUser} />
            </div>
        </>
    )
}

export default Forum;
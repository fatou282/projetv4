import { useState } from "react";
import '../styles/MainPage.css'
import NavigationPanel from "./NavigationPanel";
import SignIn from "./SignIn";
import Forum from "./Forum";
import ProfilePage from "./ProfilePage";
import AdminPanel from "./AdminPanel"


function MainPage(){
    const [isAdmin, setIsAdmin] = useState(false); // État pour isAdmin
    const [currentPage, setCurrentPage] = useState("signin_page"); //état permettant de spécifier la page courante
    const [isConnected, setConnected] = useState(false); //état permettant de dire si l'user est connecté
    const [currentUser, setCurrentUser] = useState(null);

    function login(user){
        
        setCurrentPage("message_page"); //la page courante est le forum
        setConnected(true); //l'utilisateur est connecté
        setCurrentUser(user);
    }

    function logout(){
        setCurrentPage("signin_page"); //la page courante celle de l'inscription
        setConnected(false);

    }
    function handleSetIsAdmin(value) {
        setIsAdmin(value);
    }

   
    return (
        <>
            
            {/* si la page courante est "signin_page" on affiche login, sinon : signin */}
            {currentPage === "signin_page" ? (

                <div className="signin-page">
                    <SignIn login={login} />
                    <NavigationPanel login={login} logout={logout} isConnected={isConnected} currentUser={currentUser} currentPage={currentPage} />
                    
                </div> 
            ) : (
                currentPage === "message_page" ?
                (<div className="message-page">
                    
                    {/* le forum */}
                    {isAdmin && <AdminPanel />}
                    <Forum login={login} logout={logout} isConnected={isConnected} currentUser={currentUser} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                
                </div>) : 
                (<ProfilePage setCurrentPage={setCurrentPage}/>)
            )}
        </>
    );
}

export default MainPage;
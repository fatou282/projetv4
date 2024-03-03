import User from "./User";

function ProfilePage({setCurrentPage}){

    function navigateToForum(){
        setCurrentPage("message_page");
    }

    return (
        <div>
            {setCurrentPage("profile_page")}
            <h2>Bienvenue sur la page de profil</h2>
            <User/>
            <button
                onClick={navigateToForum}
                >Revenir au forum
            </button>
        </div>
    )
}


export default ProfilePage;
import React, { useState } from "react";
import "../styles/MainPage.css";
import SignIn from "./SignIn";
import Forum from "./Forum";
import ProfilePage from "./ProfilePage";
import AdminPanel from "./AdminPanel";

function MainPage({ history }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function login(currentUser) {
    setConnected(true);
    setCurrentUser(currentUser);
    history.push("/forum"); // Redirection vers la page du forum après connexion réussie
  }

  function logout() {
    setConnected(false);
  }

  return (
    <>
      {/* Afficher le composant SignIn ou Forum en fonction de l'état de connexion */}
      {!isConnected ? (
        <div className="main-page">
          <SignIn login={login} />
          
        </div>
      ) : (
        <div className="main-page">
          {isAdmin && <AdminPanel />}
          <Forum
            isAdmin={isAdmin}
            logout={logout}
            isConnected={isConnected}
            currentUser={currentUser}
          />
          {/* Afficher le composant ProfilePage si l'utilisateur est connecté */}
          <ProfilePage />
        </div>
      )}
    </>
  );
}

export default MainPage;

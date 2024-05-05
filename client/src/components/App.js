import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import MainPage from './MainPage';
import Login from './Login';
import Forum from './Forum';
import ProfilePage from './ProfilePage';
import { useHistory } from 'react-router-dom'; 
import SignIn from './SignIn';


function App() {
  return (
    <Router>
      <Switch>
        <Route path= "/signin" component = {SignIn}/>
        <Route path="/mainpage" component={MainPage} />
        <Route path="/login" component={Login}/>
        <Route path="/forum" component={Forum} />
        <Route path="/profile" component={ProfilePage} />
        
      </Switch>
    </Router>
  );
}

export default App;

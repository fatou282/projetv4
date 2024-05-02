import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Login';
import Forum from './Forum';
import ProfilePage from './ProfilePage';
import { useHistory } from 'react-router-dom'; 


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={MainPage} />
        <Route path="/login" component={Login}/>
        <Route path="/forum" component={Forum} />
        <Route path="/profile" component={ProfilePage} />
        <Redirect from="/" to="/signin" />
      </Switch>
    </Router>
  );
}

export default App;

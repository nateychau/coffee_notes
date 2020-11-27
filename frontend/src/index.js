import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import jwt_decode from 'jwt-decode';
import { setAuthToken, logoutUser } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  //bootstrap current user
  if (localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    window.currentUser = decodedUser; //save current user to window 

    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      logoutUser();
      window.location.href = '/'; //logout current user when session expires 
    }
  }

  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
});
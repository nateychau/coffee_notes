import React from 'react';
import { logoutUser } from '../util/session_api_util';
import { Link } from 'react-router-dom';

export class Settings extends React.Component{
 constructor(props){
   super(props);
 } 

 render(){
   return (
    <div>
      <Link to="/">
        <button>
          <i className="fas fa-angle-left"></i>
        </button>
      </Link>
      <h2>Settings</h2>
      <div>Name</div>
      <div>{window.currentUser.name}</div>
      <div>Email</div>
      <div>{window.currentUser.email}</div>
      <button onClick={logoutUser}>Log Out</button>
    </div>
   )
 }
}
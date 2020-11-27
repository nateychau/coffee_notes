import React from 'react';
import { logoutUser } from '../util/session_api_util';
import * as api from "../util/api";

export class Home extends React.Component{
 constructor(props){
   super(props);
 } 

 render(){
   return (
    <div>
       <h2>Home Page</h2>
       <button onClick={logoutUser}>Log Out</button>
    </div>
   )
 }
}
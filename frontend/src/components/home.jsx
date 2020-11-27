import React from 'react';
import { Link } from 'react-router-dom';


export class Home extends React.Component{
 constructor(props){
   super(props);
 } 

 render(){
   return (
    <div>
      <Link to="/settings">
        <button>
          <i className="fas fa-cog"></i>
        </button>
      </Link>
      <div>
        <h2>Home Page</h2>
        
      </div>
    </div>
   )
 }
}
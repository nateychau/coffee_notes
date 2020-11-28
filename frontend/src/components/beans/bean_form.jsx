import React from 'react';
import * as API from '../../util/api';

export class BeanForm extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <form>
        <div className="bean-field">
          <label>Name</label>
          <input type="text"></input>
        </div>
        <div className="bean-field">
          <label>Brand</label>
          <input type="text"></input>
        </div>
        <div className="bean-field">
          <label>Place of Origin</label>
          <input ></input>
        </div>
        <div className="bean-field">
          <label>Roast</label>
          <input ></input>
        </div>
        <div className="bean-field">
          <label>Rating</label>
          <input ></input>
        </div>
      </form>
    )
  }
}
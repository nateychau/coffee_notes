import React from "react";
import * as api from "../../util/api";

const resetState = {
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
}

export class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Sign Up",
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.switchForm = this.switchForm.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  };

  switchForm(){
    if(this.state.type === "Sign Up"){
      this.setState({
        type: "Log In",
        ...resetState
        // email: "",
        // password: "",
        // passwordConfirm: "",
        // name: ""
      });
    } else {
      this.setState({
        type: "Sign Up",
        ...resetState
        // email: "",
        // password: "",
        // passwordConfirm: "",
        // name: ""
      });
    }
  }

  login(){
    const payload = { 
      email: this.state.email, 
      password: this.state.password, 
    };
    api.loginUser(payload).then((res) => {
      console.log('logged in');
    });
  }

  signup(){
    const payload = { 
      email: this.state.email, 
      password: this.state.password, 
      name: this.state.name 
    };
    api.signupUser(payload).then((res) => {
      console.log("signed up!");
      // this.setState({...resetState});
    });
  };

  render() {
    let switchText, formAction;
    if(this.state.type === "Sign Up"){
      switchText = "Already have an account? Log in instead";
      formAction = this.signup;
    } else {
      switchText = "Don't have an account? Sign Up"
      formAction = this.login; 
    }
    
    return (
      <div className="auth-body">
        <h2>coffee note</h2>
        <h3>{this.state.type}</h3>
        <form className="auth-form">
          <label>
            Email:
          </label>
          <input
            type="text"
            placeholder="enter email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          ></input>
          <label>
            Password:
          </label>
          <input
            type="password"
            placeholder="enter password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          ></input>
          {this.state.type === "Sign Up" ? 
          <>
          <label>
            Confirm password:
          </label>
          <input
            type="password"
            placeholder="enter password"
            value={this.state.passwordConfirm}
            name="passwordConfirm"
            onChange={this.handleChange}
          ></input>
          <label>
            Your name:
          </label>
          <input
            type="text"
            placeholder="enter name"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          ></input>
          </> : null}
        </form>
        <button onClick={formAction}>{this.state.type}</button>
        <button onClick={this.switchForm}>{switchText}</button>
      </div>
    );
  }
}


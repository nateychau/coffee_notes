import React from "react";
// import logo from "../../../public/images/logo.png"
import * as api from "../../util/api";
import { authenticateUser } from "../../util/session_api_util";

const resetState = {
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  errorList: {},
};

export class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Login",
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      termsAndService: false,
      errorList: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.switchForm = this.switchForm.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  switchForm() {
    if (this.state.type === "Sign up") {
      this.setState({
        type: "Login",
        ...resetState,
      });
    } else {
      this.setState({
        type: "Sign up",
        ...resetState,
      });
    }
  }

  login() {
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };
    api
      .loginUser(payload)
      .then((res) => {
        authenticateUser(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({ errorList: err.response.data });
      });
  }

  signup() {
    if (this.state.termsAndService === false) {
      alert("please agree to the terms and service");
      return;
    }
    const payload = {
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      name: this.state.name,
    };
    api
      .signupUser(payload)
      .then((res) => {
        authenticateUser(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({ errorList: err.response.data });
      });
  }

  render() {
    let switchText, formAction;
    if (this.state.type === "Sign up") {
      switchText = "Login!";
      formAction = this.signup;
    } else {
      switchText = "Sign up!";
      formAction = this.login;
    }

    return (
      <div className="auth-body">
        <div className="logo">
          <div className="logoImage"></div>
          <div className="logoText"> coffee note </div>
        </div>
        <div className="auth-form-container">
        <form className="auth-form">
          <div className="formType">{this.state.type}</div>
          {this.state.type === "Sign up" ? (
            <input
              type="text"
              placeholder="name"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            ></input>
          ) : null}
          <input
            type="text"
            placeholder="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          ></input>
          {this.state.errorList.email ? (
            <div className="auth-error">{this.state.errorList.email}</div>
          ) : null}
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          ></input>
          {this.state.errorList.password ? (
            <div className="auth-error">{this.state.errorList.password}</div>
          ) : null}
        {this.state.type === "Sign up" ? (
          <>
            <input
              type="password"
              placeholder="confirm password"
              value={this.state.passwordConfirm}
              name="passwordConfirm"
              onChange={this.handleChange}
            ></input>
            <label className="termsAndService">
              <input
                type="checkbox"
                name="termsAndService"
                className="termsAndServiceSelector"
                onChange={this.handleChange}
              ></input>
              I agree to the terms and service.
            </label>
          </>
        ) : null}
        </form>
        {this.state.type === "Login" ? (
          <span className="switchToForm">
            <div className="switchToFormText"> Don't have an account? </div>
            <button className="switchToFormButton" onClick={this.switchForm}>
              {switchText}
            </button>
          </span>
        ) : <div className="switchToForm">
        <div className="switchToFormText"> Already have an account? </div>
        <button className="switchToFormButton" onClick={this.switchForm}>
          {switchText}
        </button>
      </div>}
        <button className="formActionButton" onClick={formAction}>
          {this.state.type}
        </button>
        </div>
      </div>
    );
  }
}

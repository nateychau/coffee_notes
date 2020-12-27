import React from "react";
import { Link } from "react-router-dom"
import * as API from "../util/api";
import { logoutUser } from "../util/session_api_util";
import { BackButton } from "./back";
import { Header } from "./header";


export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyName: '',
    }
    this.signinSpotify = this.signinSpotify.bind(this);

  }

  signinSpotify() {
    // const redirectUrl = API.signinSpotify();
    console.log('sign in spotify');
    // console.log(redirectUrl);
  }

  logoutSpotify() {
    // API.logoutSpotify();
    console.log('log out spotify');
  }

  render() {
    return (
      <>
        <Header />
        <BackButton />
        <div className="settings-container">
          <h2>Settings</h2>
          <div className="img-container">
            Placeholder
          </div>
          <h4>Name</h4>
          <div className="settings-field">{window.currentUser.name}</div>
          <h4>Email</h4>
          <div className="settings-field">{window.currentUser.email}</div>
          <Link
            to={{
              pathname:"/spotify/login"
            }}
          >
            <button className="spotifyButton"> spotify sign in </button>
          </Link>
          {/* <button className="spotifyButton2" onClick={this.signinSpotify}> spotify log in </button> */}
          <button className="logoutButton" onClick={logoutUser}>Log Out</button>
        </div>
      </>
    );
  }
}

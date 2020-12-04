import React from "react";
import { logoutUser } from "../util/session_api_util";
import { BackButton } from "./back";
import { Header } from "./header";

export class Settings extends React.Component {
  constructor(props) {
    super(props);
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
          <button onClick={logoutUser}>Log Out</button>
        </div>
      </>
    );
  }
}

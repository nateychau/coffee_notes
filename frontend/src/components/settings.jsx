import React from "react";
import { Link } from "react-router-dom"
import { logoutUser } from "../util/session_api_util";
import * as API from "../util/api";
import { BackButton } from "./back";
import { Header } from "./header";

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: '',
      song: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchSong = this.searchSong.bind(this);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  searchSong() {
    console.log(this.state);
    API.searchSpotifySong(this.state.songName).then((song) => {
      this.setState({ song: song.data.tracks.items});
      console.log(this.state);
    })
    .catch((err) => console.log(err));
  }

  componentDidMount() {  
    API.getSpotifyUser().then((user) => {
      this.setState({...user.data});
      console.log(this.state);
    })
    .catch((err) => console.log(err));
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
          <h4> Spotify Account </h4>
          <div className="settings-field">{this.state.display_name}</div>
          <Link
            to={{
              pathname:`/spotify/login`
            }}
          >
            <button className="spotifyButton"> Connect your Spotify Account </button>
          </Link>
          <input
            onChange={this.handleChange}
            type="text"
            name="songName"
            value={this.state.songName}
          ></input>
          <button className="spotifyButton2" onClick={this.searchSong}> query song</button>
          <button className="logoutButton" onClick={logoutUser}>Log Out</button>
        </div>
      </>
    );
  }
}

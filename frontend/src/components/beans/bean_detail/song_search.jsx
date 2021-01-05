import React from "react";
import * as API from "../../../util/api";
import { Header } from "../../header";
import { BackButton } from "../../back";
import { SongIndexItem } from "./song_index_item";
import { Link } from "react-router-dom";

export class SongSearch extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        userSong: '',
        songs: [],
        bean: this.props.location.state.bean,
      };
      this.handleChange = this.handleChange.bind(this);
      this.searchSong = this.searchSong.bind(this);
      this.addSongToBean = this.addSongToBean.bind(this);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  addSongToBean(songs) {
    const payload = {
      userId: window.currentUser.id,
      id: this.state.bean,
      song: songs
    };

    console.log(payload);
    API.updateBean(payload)
      .then((res) => {
        console.log('successfully added song to bean');
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  searchSong() {
    console.log(this.state);
    API.searchSpotifySong(this.state.userSong).then((song) => {
      this.setState({ songs: song.data.tracks.items});
      console.log(this.state);
    })
    .catch((err) => console.log(err));
  }

  render() {
    const songsList = this.state.songs.length ? this.state.songs.map((songs, i) => {
      return <SongIndexItem
        key={i}
        songs={songs}
        addSongToBean={this.addSongToBean}
      />
    }) : [];
    return (
      <>
      <Header />
      <Link
        to={{
          pathname:`/beans/${this.state.bean._id}`
        }}
      >
        <div>
          back
        </div>
      </Link>
      <br />
      <div>
          <h3> Search Spotify for your song </h3>
          <input
            onChange={this.handleChange}
            type="text"
            name="userSong"
            value={this.state.userSong}
          ></input>
          <button className="" onClick={this.searchSong}> query song</button>
      </div>
      <ul>
        {songsList}
      </ul>
      </>
    )
  };
}
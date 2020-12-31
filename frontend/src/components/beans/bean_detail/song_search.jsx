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
        songName: '',
        songs: [],
        bean: this.props.location.state.bean,
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
      this.setState({ songs: song.data.tracks.items});
      console.log(this.state);
    })
    .catch((err) => console.log(err));
  }

  render() {
    console.log('song search rendered');
    const songsList = this.state.songs.length ? this.state.songs.map((songs, i) => {
      return <SongIndexItem
        key={i}
        songs={songs}
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
            name="songName"
            value={this.state.songName}
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
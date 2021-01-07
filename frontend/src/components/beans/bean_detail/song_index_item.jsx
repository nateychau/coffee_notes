import React from "react";

export const SongIndexItem = ({songs, addSongToBean}) => {
  console.log(songs);
  return (
    <li>
      <div className="songContainer">
        <img 
          alt="album cover" src={`${songs.album.images[0].url}`}
          width="80"
          height="80"
        >
        </img>
        <div 
          style={{color: 'var(--light-text-color)'}}
          className="songText"
          >
          <div> {songs.album.name} </div>
          <div> {songs.name} </div>
          <div> {songs.artists[0].name} </div>
        </div>
        <button 
          className="addSongButton"
          onClick={() => addSongToBean(songs)}>
          add song
        </button>
      </div>
      <br/>
    </li>
  );
}

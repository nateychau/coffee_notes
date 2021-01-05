import React from "react";

export const SongIndexItem = ({songs, addSongToBean}) => {
  console.log(songs);
  return (
    <li>
      <img 
        alt="album cover" src={`${songs.album.images[0].url}`}
        width="80"
        height="80"
      >
      </img>
      <div>
        {songs.album.name}
      </div>
      <div>
        {songs.name}
      </div>
      <div>
        {songs.artists[0].name}
      </div>
      {/* <div>
        <img src=""
        {songs.album.images[0].url}
      </div> */}
      <br/>
    </li>
  );
}

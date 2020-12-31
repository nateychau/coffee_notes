import React from "react";

export const SongIndexItem = ({songs}) => {
  console.log(songs);
  return (
    <li>
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

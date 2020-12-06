import React from "react";

const fixTimeStamp = (note) => {  
  let timeStamp = note.updatedAt;
  return timeStamp.slice(0,9);
}

export const NoteIndexItem = ({ note }) => {
  return (
    <li className="note-item-container">
      <div className="note-container">
        <div>
          <div className="note-item-header"> Date </div>
          <div className="note-item-text">{fixTimeStamp(note)}</div>
        </div>
        <div>
          <div className="note-item-header"> Brew Method </div>
          <div className="note-item-text">{note.brewMethod}</div>
        </div>
        <div>
          <div className="note-item-header"> Brew Time </div>
          <div className="note-item-text">{note.time}</div>
        </div> 
        <div>
          <div className="note-item-header"> Coffee to Water Ratio </div>
          <div className="note-item-text">{note.ratio}</div>
        </div>
        <div>
          <div className="note-item-header"> Notes </div>
          <div className="note-item-text">{note.notes}</div>
        </div>
      </div>
    </li>
  );
}


import React, { useState } from "react";
import { Link } from 'react-router-dom';

const fixTimeStamp = (note) => {  
  let timeStamp = note.updatedAt;
  return timeStamp.slice(0,9);
}

export const NoteIndexItem = ({ note, handleDelete }) => {
  const [more, setMore] = useState(false);

  return (
    <li className="note-item-container">
      <div className="note-container">
        <div className="note-wrapper">
          <div className="note-item-header"> Date </div>
          <div className="note-item-text">{fixTimeStamp(note)}</div>
        </div>
        <div>
          <div
            onBlur={(e) => {
              if(!e.currentTarget.contains(e.relatedTarget)) {
              setMore(false);
              }
            }}
            className="options-detail"
          >
            <button onClick={() => setMore(!more)}>
              <i className="fas fa-ellipsis-h"></i>
            </button>
            {more ? (
              <>
                <button onClick={() => {handleDelete(note)}}>
                  <i className="fas fa-trash"></i>
                </button>
                  <Link 
                    to={{
                      pathname: "/notes/new",
                      state: {
                        note: note
                      }
                    }}>
                      <button>
                        <i className="fas fa-pen"></i>
                      </button>
                  </Link>
              </>
            ) : null}
          </div>
        </div>
        <div className="note-wrapper">
          <div className="note-item-header"> Brew Method </div>
          <div className="note-item-text">{note.brewMethod}</div>
        </div>
        <div className="note-wrapper">
          <div className="note-item-header"> Brew Time </div>
          <div className="note-item-text">{note.time}</div>
        </div> 
        <div className="note-wrapper">
          <div className="note-item-header"> Coffee to Water Ratio </div>
          <div className="note-item-text">{note.ratio}</div>
        </div>
        <div className="note-wrapper">
          <div className="note-item-header"> Notes </div>
          <div className="note-item-text">{note.notes}</div>
        </div>
      </div>
    </li>
  );
}


import React from "react";
import { Link } from "react-router-dom";

export const NoteIndexItem = ({ note }) => (
  <li className="note-item-container">
    <Link className="note-item" to={`/notes/bean/${note.beanId}`}>
      <div className="note-container">
        <div className="note-item-text">
          <div>{note.brewMethod}</div>
          <div>{note.time}</div>
          <div>{note.ratio}</div>
          <div>{note.notes}</div>
        </div>
      </div>
      <br></br>
    </Link>
  </li>
);
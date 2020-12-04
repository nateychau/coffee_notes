import React from "react";
import { Link } from "react-router-dom";

export const NoteIndexItem = ({ note }) => (
  <li className="note-item-container">
    <div className="note-container">
      <div className="note-item-text">
        <div>{note.brewMethod}</div>
        <div>{note.time}</div>
        <div>{note.ratio}</div>
        <div>{note.notes}</div>
      </div>
    </div>
  </li>
);

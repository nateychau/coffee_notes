import React, { useState } from "react";
import { BackButton } from "../../back";
import { shortName } from "../../../util/bean_util";
import { Link } from "react-router-dom";

export const StaticDetail = ({ bean, notes, handleDelete, handleEdit }) => {
  const [more, setMore] = useState(false);

  return (
    <div className="static-detail">
      <BackButton />
      <div className="img-container">
        <img
          alt="Bean"
          src="https://raw.githubusercontent.com/nateychau/coffee_notes/main/frontend/public/images/placeholder.jpg"
        ></img>
      </div>
      <div className="detail-card">
        <div
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setMore(false);
            }
          }}
          className="detail-btn-container"
        >
          <button onClick={() => setMore(!more)}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
          {more ? (
            <>
              <button onClick={handleDelete}>
                <i className="fas fa-trash"></i>
              </button>
              <button onClick={handleEdit}>
                <i className="fas fa-pen"></i>
              </button>
            </>
          ) : null}
        </div>
        <h2 className="bean-name">Name</h2>
        <div className="bean-name">{bean.name}</div>
        <div className="detail-text">
          <div className="detail-text-left">
            <h2>Roaster</h2>
            <div>{bean.roaster}</div>
            <h2>Place of Origin</h2>
            <div>{bean.origin}</div>
            <h2>Roast</h2>
            <div>{bean.roast}</div>
            <h2>Rating</h2>
            <div>{bean.rating}</div>
          </div>
          {notes ? (
            <div className="detail-text-right">
              <h2> Brew Method </h2>
              <div>{notes.brewMethod}</div>
              <h2>Brew Time</h2>
              <div>{notes.time}</div>
              <h2> Coffee to Water Ratio </h2>
              <div>{notes.ratio}</div>
              <h2>Personal Notes</h2>
              <div>{notes.notes}</div>
            </div>
          ) : 
          (
            <div className="detail-text-right no-note">
              No entries yet
            </div>
          )}
        </div>
        {notes ? (
          <Link className="brewEntries" to={`/notes/bean/${notes.beanId}`}>
            <div className="brewEntriesButton"> view all entries </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

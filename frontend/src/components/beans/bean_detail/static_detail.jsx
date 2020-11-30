import React, { useState } from "react";
import { BackButton } from "../../back";

export const StaticDetail = ({ bean, handleDelete, handleEdit }) => {
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
        <div className="detail-btn-container">
          <button onBlur={() => setMore(false)} onClick={() => setMore(!more)}>
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
        <div className="detail-text">
          <h2>Name</h2>
          <div>{bean.name}</div>
          <h2>Roaster</h2>
          <div>{bean.roaster}</div>
          <h2>Place of Origin</h2>
          <div>{bean.origin}</div>
          <h2>Roast</h2>
          <div>{bean.roast}</div>
          <h2>Rating</h2>
          <div>{bean.rating}</div>
        </div>
      </div>
    </div>
  );
};

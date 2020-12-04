import React from "react";
import { Link } from "react-router-dom";
import { shortName } from "../../util/bean_util";

export const CurrentBeanItem = ({ bean }) => (
  <li className="current-bean-container">
    <h2>current beans</h2>
    <Link className="current-bean-item" to={`/beans/${bean._id}`}>
      <div className="current-bean-left">
        <div className="img-container">
          <img
            alt="Bean"
            src="https://raw.githubusercontent.com/nateychau/coffee_notes/main/frontend/public/images/placeholder.jpg"
          ></img>
          <div>Placeholder for Song</div>
        </div>
      </div>
      <div className="current-bean-right">
        <h2>Name</h2>
        <div>{shortName(bean.name, 20)}</div>
        <h2>Roaster</h2>
        <div>{bean.roaster}</div>
        <h2>Place of Origin</h2>
        <div>{bean.origin}</div>
        <h2>Roast</h2>
        <div>{bean.roast}</div>
        <h2>Rating</h2>
        <div>{bean.rating}</div>
      </div>
    </Link>
  </li>
);

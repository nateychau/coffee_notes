import React from "react";
import { Link } from "react-router-dom";

export const BeanIndexItem = ({ bean }) => (
  <li className="bean-item-container">
    <Link className="bean-item" to={`/beans/${bean._id}`}>
      <div className="img-container">
        <img
          alt="Bean"
          src="https://raw.githubusercontent.com/nateychau/coffee_notes/main/frontend/public/images/placeholder.jpg"
        ></img>
      </div>
      <div className="bean-item-text">
        <h2>{bean.name}</h2>
        <h4>{bean.roaster}</h4>
        <div>{bean.origin}</div>
        <div>{bean.roast}</div>
      </div>
    </Link>
  </li>
);

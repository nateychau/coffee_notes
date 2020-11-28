import React from "react";
import { Link } from "react-router-dom";
export const BeanIndexItem = ({ bean }) => (
  <li className="bean-item-container">
    <Link className="bean-item" to={`/beans/${bean._id}`}>
      <div className="img-container">
        <div>Photo</div>
      </div>
      <h2>{bean.name}</h2>
      <h4>{bean.roaster}</h4>
      <div>{bean.origin}</div>
      <div>{bean.rating}</div>
    </Link>
  </li>
);

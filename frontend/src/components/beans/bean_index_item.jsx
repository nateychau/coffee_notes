import React from "react";

export const BeanIndexItem = ({ bean }) => (
  <li className="bean-item-container">
    <div className="bean-item">
      <div className="img-container">
        <div>Photo</div>
      </div>
      <h2>{bean.name}</h2>
      <h4>{bean.roaster}</h4>
      <div>{bean.origin}</div>
      <div>{bean.rating}</div>
    </div>
  </li>
);

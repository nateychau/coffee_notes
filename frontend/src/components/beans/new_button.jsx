import React from "react";
import { Link } from "react-router-dom";

export const NewButton = () => (
  <Link to="/beans/new">
    <button id="new-btn">
      <i className="fas fa-plus"></i>
    </button>
  </Link>
);

import React from "react";
import { Link } from "react-router-dom";

export const BackButton = () => {
  return (
    <Link to="/" id="back-btn">
      <button>
        <i className="fas fa-angle-left"></i>
      </button>
    </Link>
  );
};

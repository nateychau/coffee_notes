import React from "react";
import { Link } from "react-router-dom";

export const NewButton = () => (
  <Link to="/beans/new">
    <button>+</button>
  </Link>
);

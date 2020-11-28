import React from "react";
import { Link } from "react-router-dom";
import { NewButton } from "./beans/new_button";
import { BeanIndex } from "./beans/bean_index";

export const Home = () => {
    return (
      <div>
        <Link to="/settings">
          <button>
            <i className="fas fa-cog"></i>
          </button>
        </Link>
        <div>
          <h2>Home Page</h2>
          <BeanIndex />
          <NewButton />
        </div>
      </div>
    );
}
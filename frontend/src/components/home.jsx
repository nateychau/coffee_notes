import React from "react";
import { Link } from "react-router-dom";
import { NewButton } from "./beans/new_button";
import { BeanIndex } from "./beans/bean_index";
import { Header } from './header';

export const Home = () => {
    return (
      <div className="home">
        <Header />
        {/* <div id="home-spacer"></div> */}
        <Link to="/settings" className="settings-btn">
          <button>
            <i className="fas fa-cog"></i>
          </button>
        </Link>
        <BeanIndex />
        <NewButton />
      </div>
    );
}
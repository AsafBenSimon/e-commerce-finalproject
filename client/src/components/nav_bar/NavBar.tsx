import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="container2">
        <h1 className="main-Name">
          <Link to="/" className="main-Name-Link">
            Electrick<span className="dot"></span>
          </Link>
        </h1>
        <div className="NavBar-MiniContainer">
          <div className="NavBar-Search">
            <input className="Search" type="text" placeholder="Search here" />
            <button className="search-button" type="button">
              Search
            </button>
          </div>
          <div className="NavBar-Cart">
            <img className="svg-cart" src="assets/img/cart.png" alt="Cart" />
            <span>Your Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="container2">
        <h1 className="main-Name">
          Electrick<span className="dot"></span>
        </h1>
        <div className="NavBar-MiniContainer">
          <div className="NavBar-Search">
            <input className="Search" type="text" placeholder="Search here" />
            <button className="search-button" typeof="button">
              Search
            </button>
          </div>
          <div className="NavBar-Cart">
            <img className="svg-cart" src="assets\icons\cart.svg" />
            <span>Your Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

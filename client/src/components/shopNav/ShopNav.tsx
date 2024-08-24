import React from "react";
import "./ShopNav.css";
import { Link } from "react-router-dom";

function ShopNav() {
  return (
    <>
      <div className="shop-nav">
        <div className="red-line-container">
          <Link to={"/"}>
            <span className="nav-item">Home</span>
          </Link>
          <div className="red-line"></div>
        </div>
        <div className="red-line-container">
          <Link to={"/hot-deals"}>
            <span className="nav-item">Hot Deals</span>
          </Link>
          <div className="red-line"></div>
        </div>
      </div>
    </>
  );
}

export default ShopNav;

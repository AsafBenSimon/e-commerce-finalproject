import React from "react";
import "./ShopNav.css";

function ShopNav() {
  return (
    <>
      <div className="shop-nav">
        <div className="red-line-container">
          <span className="nav-item">Home</span>
          <div className="red-line"></div>
        </div>
        <div className="red-line-container">
          <span className="nav-item">Hot Deals</span>
          <div className="red-line"></div>
        </div>
      </div>
    </>
  );
}

export default ShopNav;

import React from "react";
import "./MiniNav.css";

const MiniNav: React.FC = () => {
  return (
    <>
      <div className="MiniNav">
        <div className="us-info">
          <div className="phone">
            <img src="assets\icons\phone.svg" />
            <p>0503555555</p>
          </div>
          <div className="email">
            <img src="assets\img\email.png" />
            <p>asaf@gmail.com</p>
          </div>
          <div className="location">
            <img src="assets\icons\location.svg" />
            <p>qiryat ono levi eskol 78</p>
          </div>
        </div>
        <div className="your-info">
          <img src="assets\icons\user.svg" />
          <p>My Account</p>
        </div>
      </div>
    </>
  );
};

export default MiniNav;

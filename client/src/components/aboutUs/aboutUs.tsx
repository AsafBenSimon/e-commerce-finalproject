import React from "react";
import "./aboutUs.css";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-details">
        <span className="about-us-title">ABOUT US</span>
        <p className="about-us-description">
          We are a small company that wants to provide the best products at the
          best prices, as we ourselves are gamers.
        </p>
        <div className="about-us-contact">
          <img
            className="contact-icon"
            src="/assets/icons/location.svg"
            alt="Location icon"
          />
          <span className="contact-info">qiryat ono levi eskol 78</span>
        </div>
        <div className="about-us-contact">
          <img
            className="contact-icon"
            src="/assets/icons/phone.svg"
            alt="Phone icon"
          />
          <span className="contact-info">0503555555</span>
        </div>
        <div className="about-us-contact">
          <img
            className="contact-icon"
            src="/assets/img/email.png"
            alt="Email icon"
          />
          <span className="contact-info">asaf@email.com</span>
        </div>
      </div>
      <div className="about-us-service">
        <span className="service-title">SERVICE</span>
        <Link to={"/profile"}>
          <span className="service-link my-profile"> My Profile</span>
        </Link>
        <Link to={"/cart"}>
          <span className="service-link">View Cart</span>
        </Link>
      </div>
    </div>
  );
}

export default AboutUs;

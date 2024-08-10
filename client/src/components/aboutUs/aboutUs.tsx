import React from "react";
import "./aboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-details">
        <span className="about-us-title">ABOUT US</span>
        <p className="about-us-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut.
        </p>
        <div className="about-us-contact">
          <img
            className="contact-icon"
            src="assets/icons/location.svg"
            alt="Location icon"
          />
          <span className="contact-info">qiryat ono levi eskol 78</span>
        </div>
        <div className="about-us-contact">
          <img
            className="contact-icon"
            src="assets/icons/phone.svg"
            alt="Phone icon"
          />
          <span className="contact-info">0503555555</span>
        </div>
        <div className="about-us-contact">
          <img
            className="contact-icon"
            src="assets/img/email.png"
            alt="Email icon"
          />
          <span className="contact-info">asaf@email.com</span>
        </div>
      </div>
      <div className="about-us-service">
        <span className="service-title">SERVICE</span>
        <span className="service-link my-account">My Account</span>
        <span className="service-link">View Cart</span>
        <span className="service-link">Wishlist</span>
        <span className="service-link">Track My Order</span>
        <span className="service-link">Help</span>
      </div>
    </div>
  );
}

export default AboutUs;

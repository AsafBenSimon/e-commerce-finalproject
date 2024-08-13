import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./MiniNav.css";

const LOGOUT_URL = "/api/auth/logout";

const MiniNav: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    try {
      await axios.post(LOGOUT_URL);
    } catch (error) {
      console.error("Logout failed:", error);
    }

    navigate("/sign-in");
  };

  return (
    <div className="MiniNav">
      <div className="us-info">
        <div className="phone">
          <img src="assets/icons/phone.svg" alt="Phone" />
          <p>0503555555</p>
        </div>
        <div className="email">
          <img src="assets/img/email.png" alt="Email" />
          <p>asaf@gmail.com</p>
        </div>
        <div className="location">
          <img src="assets/icons/location.svg" alt="Location" />
          <p>qiryat ono levi eskol 78</p>
        </div>
      </div>
      <div className="your-info">
        <img src="assets/icons/user.svg" alt="User" />
        {isLoggedIn ? (
          <div className="welcome-container">
            <span className="welcome-text">Welcome back, {username}!</span>
            <div className="dropdown-menu">
              <Link to="/cart">Your Cart</Link>
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/sign-in">My Account</Link>
        )}
      </div>
    </div>
  );
};

export default MiniNav;

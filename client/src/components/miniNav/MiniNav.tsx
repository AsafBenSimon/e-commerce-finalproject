import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./MiniNav.css";

const LOGOUT_URL = "http://localhost:3000/api/auth/logout";

const MiniNav: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    // Close dropdown if clicked outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    window.location.reload(); // Refresh the page after logout
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="MiniNav">
      <div className="us-info">
        <div className="phone">
          <img src="/assets/icons/phone.svg" alt="Phone" />
          <p>0503555555</p>
        </div>
        <div className="email">
          <img src="/assets/img/email.png" alt="Email" />
          <p>asaf@gmail.com</p>
        </div>
        <div className="location">
          <img src="/assets/icons/location.svg" alt="Location" />
          <p>Qiryat Ono, Levi Eskol 78</p>
        </div>
      </div>
      <div className="your-info">
        <img src="/assets/icons/user.svg" alt="User" />
        {isLoggedIn ? (
          <div className="welcome-container">
            <span className="welcome-text" onClick={toggleDropdown}>
              Welcome back, {username}!
            </span>
            {dropdownVisible && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <Link to="/profile">Profile</Link>
                <Link to="/cart">Your Cart</Link>
                <button className="logout-button" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/sign-in">Please Login</Link>
        )}
      </div>
    </div>
  );
};

export default MiniNav;

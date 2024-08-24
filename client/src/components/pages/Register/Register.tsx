import React, { useState } from "react";
import axios from "../../../api/axios"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import "./Register.css";

const REGISTER_URL =
  "https://e-commerce-finalproject-server.onrender.com/api/auth/register"; // Endpoint for registration

const Register: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(REGISTER_URL, {
        userName,
        email,
        password,
      });

      // Log response for debugging
      console.log("Server response:", response.data);

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/sign-in"); // Redirect to sign-in page after successful registration
        }, 1000); // Delay to allow the success message to display
      } else {
        // Handle unexpected responses
        throw new Error(response.data.message || "Unexpected error occurred.");
      }
    } catch (err: any) {
      // Improved error handling
      console.error("Registration error:", err.response || err);
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      setSuccess(false);
    }
  };

  return (
    <div className="app-container">
      <div className="register-page">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
          {success && (
            <p className="success">
              Registration successful! Redirecting to sign-in page...
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import "./SignIn.css";

const LOGIN_URL = "http://localhost:3000/api/auth/login";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(LOGIN_URL, { email, password });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.userName);
        setSuccess(true);
        setTimeout(() => {
          navigate("/", { replace: true }); // Redirect to home page
          window.location.reload(); // Refresh the page after redirect
        }, 100); // Short delay to ensure successful login message is displayed
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      setSuccess(false);
    }
  };

  return (
    <div className="app-container">
      <div className="sign-in-page">
        {success ? (
          <section>
            <h2>You are logged in!</h2>
            <p>
              <Link to="/">Go to Home</Link>
            </p>
          </section>
        ) : (
          <>
            <h2>Sign In</h2>
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
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign In</button>
              {error && <p className="error">{error}</p>}
            </form>
            <p className="register-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import "./SignIn.css";

const LOGIN_URL = "/api/auth/login";

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
        localStorage.setItem("username", response.data.user.userName); // Ensure this is correctly set
        setSuccess(true);
        navigate("/");
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
    <>
      {success ? (
        <section>
          <h2>You are logged in!</h2>
          <p>
            <a href="/">Go to Home</a>
          </p>
        </section>
      ) : (
        <div className="sign-in-page">
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
        </div>
      )}
    </>
  );
};

export default SignIn;

// src/components/Login.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogin = () => {
    dispatch(login({ id: 1, name: "User" }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Login;

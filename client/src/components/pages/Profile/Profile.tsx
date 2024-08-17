// src/components/profile/Profile.tsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "../../../app/features/user/userThunk";
import MiniNav from "../../miniNav/MiniNav";
import NavBar from "../../nav_bar/NavBar";
import AboutUs from "../../aboutUs/aboutUs";
import LastOrders from "../../LastOrders/LastOrders";
import "./Profile.css";
import { User } from "../../../app/features/user/userTypes";

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.profile);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);
  const [formData, setFormData] = useState<User>({
    userName: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile...");
        await dispatch(fetchUserProfile()).unwrap();
        console.log("User profile fetched.");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log("User profile updated in state:", user);
      setFormData({
        userName: user.userName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (updateStatus === "succeeded") {
      console.log("Update succeeded, refetching user profile...");
      dispatch(fetchUserProfile())
        .unwrap()
        .catch((err) => {
          console.error("Failed to refetch profile:", err);
        });
      setUpdateStatus(null); // Reset update status
    }
  }, [updateStatus, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUpdateStatus("loading");
      console.log("Updating user profile with data:", formData);
      await dispatch(updateUserProfile(formData)).unwrap();
      console.log("Profile update action dispatched.");
      setUpdateStatus("succeeded");
      alert(
        "Profile updated successfully! It will only show the username changes after you re-login."
      );
    } catch (err) {
      console.error("Failed to update profile:", err);
      setUpdateStatus("failed");
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      currentPassword: passwordData.currentPassword
        ? ""
        : "Current password is required",
      newPassword: passwordData.newPassword ? "" : "New password is required",
      confirmPassword: passwordData.confirmPassword
        ? passwordData.newPassword === passwordData.confirmPassword
          ? ""
          : "Passwords do not match"
        : "Confirm new password is required",
    };

    setPasswordErrors(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      await dispatch(changeUserPassword(passwordData)).unwrap();
      alert("Password changed successfully.");
    } catch (err) {
      console.error("Failed to change password:", err);
      alert("Failed to change password.");
    }
  };

  return (
    <>
      <MiniNav />
      <NavBar />
      <div className="profile-container">
        <h2>Your Profile</h2>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleUpdate}>
              <label htmlFor="userName">Name:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <button type="submit">Update Profile</button>
            </form>

            <form
              onSubmit={handleChangePassword}
              className="password-change-form"
            >
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.currentPassword && (
                <p className="error-message">
                  {passwordErrors.currentPassword}
                </p>
              )}

              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                placeholder="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.newPassword && (
                <p className="error-message">{passwordErrors.newPassword}</p>
              )}

              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.confirmPassword && (
                <p className="error-message">
                  {passwordErrors.confirmPassword}
                </p>
              )}

              <button type="submit">Change Password</button>
            </form>
          </>
        )}
        <LastOrders /> {/* Include the LastOrders component here */}
      </div>
      <AboutUs />
    </>
  );
};

export default Profile;

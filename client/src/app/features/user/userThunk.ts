// src/app/features/user/userThunk.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import type { ChangePasswordData, Order, Product, User } from "./userTypes";

const API_URL = "http://localhost:3000/api";

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/profile`);
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch user profile");
  }
});

export const updateUserProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>("user/updateUserProfile", async (userData, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: { token: string } };
    const token = state.auth.token;
    const response = await axios.put<User>(
      `${API_URL}/users/profile`,
      userData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to update user profile");
  }
});

export const fetchUserOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("user/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Order[]>(`${API_URL}/orders/my-orders`);
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch user orders");
  }
});

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("user/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products/list`); // Updated route
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch products");
  }
});

export const changeUserPassword = createAsyncThunk<
  void,
  ChangePasswordData,
  { rejectValue: string }
>(
  "user/changeUserPassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      await axios.put<void>(
        `${API_URL}/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is set correctly
          },
        }
      );
    } catch (error) {
      // Type-cast the error to Error and extract the error message
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to change password"
        );
      }
      return rejectWithValue("Failed to change password");
    }
  }
);

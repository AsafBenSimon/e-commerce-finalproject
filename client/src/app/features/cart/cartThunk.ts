import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartTypes";

// Define the type for the thunk
export const addToCart = createAsyncThunk<
  CartItem, // The type of the returned value
  CartItem, // The type of the argument to the thunk
  { rejectValue: string } // The type of the error returned
>("cart/addToCart", async (item, { rejectWithValue }) => {
  try {
    const response = await axios.post<CartItem>(
      "http://localhost:3000/api/orders/addToCart",
      item
    );
    return response.data;
  } catch (error) {
    // Handle error properly
    if (axios.isAxiosError(error)) {
      // Error is an AxiosError
      return rejectWithValue(error.response?.data || "An error occurred");
    }
    // Handle other types of errors
    return rejectWithValue("An unknown error occurred");
  }
});

export const addCartItem = createAsyncThunk<
  void,
  CartItem,
  { rejectValue: string }
>("cart/addCartItem", async (cartItem, { rejectWithValue }) => {
  try {
    await axios.post("http://localhost:3000/api/orders/addToCart", cartItem);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

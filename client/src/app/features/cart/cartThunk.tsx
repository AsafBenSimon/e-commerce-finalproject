import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartTypes";

// Fetch cart items from the server
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get("http://localhost:3000/api/cart"); // Adjust the endpoint as needed
    return response.data;
  }
);

// Add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item: CartItem) => {
    const response = await axios.post(
      "http://localhost:3000/api/orders/cart",
      item
    );
    return response.data;
  }
);
// Define the thunk
export const removeFromCart = createAsyncThunk<string, string>(
  "cart/removeFromCart",
  async (id: string) => {
    await axios.delete(`http://localhost:3000/api/cart/${id}`);
    return id; // Return the ID of the removed item
  }
);

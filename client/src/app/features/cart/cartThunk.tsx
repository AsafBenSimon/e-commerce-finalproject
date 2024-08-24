import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartTypes";
import { clearCart } from "./cartSlice";

// Define the base URL for your API

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem: CartItem, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // or however you store your token
      const response = await axios.post(
        `https://e-commerce-finalproject-server.onrender.com/api/orders/cart`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to add item to cart"
      );
    }
  }
);

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://e-commerce-finalproject-server.onrender.com/api/orders/cart`
      );
      return response.data; // Expecting the cart items in the response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart items"
      );
    }
  }
);

// Define a type for the error response

// Thunk to remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://e-commerce-finalproject-server.onrender.com/api/orders/update/${productId}`
      );
      return response.data.cart;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || "Failed to remove item from cart"
        );
      }
      return rejectWithValue("Failed to remove item from cart");
    }
  }
);
export const fetchProductAndAddToCart = createAsyncThunk(
  "cart/fetchProductAndAddToCart",
  async (productId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://e-commerce-finalproject-server.onrender.com/api/products/${productId}`
      );
      const product = response.data;

      const cartItem: CartItem = {
        _id: product._id,
        productId: product.productId,
        productName: product.productName, // Ensure these fields are present
        price: product.price,
        img: product.img,
        quantity: 1,
      };

      dispatch(addToCart(cartItem));
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch product details"
      );
    }
  }
);

// Checkout
export const checkout = createAsyncThunk(
  "cart/checkout",
  async (
    payload: { products: CartItem[]; totalPrice: number },
    { dispatch }
  ) => {
    try {
      await axios.post(
        "https://e-commerce-finalproject-server.onrender.com/api/orders/checkout",
        payload
      );
      dispatch(clearCart()); // Clear the cart in Redux store
    } catch (error) {
      console.error("Checkout failed:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  }
);

// Action to load cart items
export const loadCartItems = createAsyncThunk(
  "cart/loadCartItems",
  async (items: CartItem[]) => {
    // Simply return the items to update the state
    return items;
  }
);

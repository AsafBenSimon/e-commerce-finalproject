// src/app/features/product/productThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddReviewPayload, Product } from "./Product";

const API_URL = "http://localhost:3000/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/api/products/list");
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk<Product, string>(
  "product/fetchById",
  async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);
// Example API function
export const addReview = createAsyncThunk(
  "product/addReview",
  async (reviewPayload: AddReviewPayload, { rejectWithValue }) => {
    try {
      // Assuming you have a way to get the auth token from your state or storage
      const token = localStorage.getItem("authToken"); // Replace with actual token retrieval logic

      const response = await axios.post(
        `http://localhost:3000/api/products/${reviewPayload.productId}/reviews`,
        {
          rating: reviewPayload.rating,
          comment: reviewPayload.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      return response.data;
    } catch (err) {
      // Type assertion to handle unknown error type
      if (axios.isAxiosError(err)) {
        // Handle Axios errors
        return rejectWithValue(err.response?.data || "Failed to add review");
      } else {
        // Handle other types of errors
        return rejectWithValue("Failed to add review");
      }
    }
  }
);

// Define an error type that matches the structure of your API error response
interface ApiError {
  message: string;
}

// Thunk to fetch product reviews
export const fetchProductReviews = createAsyncThunk(
  "product/fetchProductReviews",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${productId}/reviews`
      );
      return response.data;
    } catch (error) {
      // Use type assertion to assert the error type
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      // Handle other types of errors if necessary
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

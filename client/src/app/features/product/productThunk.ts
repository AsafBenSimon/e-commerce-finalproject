// src/app/features/product/productThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/api/products/list");
    return response.data;
  }
);

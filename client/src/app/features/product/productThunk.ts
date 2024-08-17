// src/app/features/product/productThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../features/product/Product";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "http://localhost:3000/api/products/list"
    );
    return response.data;
  }
);

// src/app/features/product/productThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./Product";

const API_URL =
  "https://e-commerce-finalproject-server.onrender.com/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://e-commerce-finalproject-server.onrender.com/api/products/list"
    );
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

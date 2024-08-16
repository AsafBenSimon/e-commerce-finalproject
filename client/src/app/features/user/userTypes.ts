// src/app/features/user/userTypes.ts

import { Key, ReactNode } from "react";

export interface User {
  userName: string;
  email: string;
  // Add other fields as needed
}

export interface Product {
  _id: string;
  id: string;
  name: any;
  productId: string;
  quantity: number;
}

export interface Order {
  _id: ReactNode;
  id: string; // Use 'id' for Order ID
  products: Product[];
  totalPrice: number;
  createdAt: string; // ISO date string
}

export interface UserState {
  profile: User | null;
  pastOrders: Order[];
  products: Product[]; // Ensure this property is correctly defined
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

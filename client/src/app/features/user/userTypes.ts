// src/app/features/user/userTypes.ts

import { Product } from "../product/Product";

export interface User {
  userName: string;
  email: string;
  // Add other fields as needed
}

export interface Order {
  _id: string; // Use 'id' for Order ID
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
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

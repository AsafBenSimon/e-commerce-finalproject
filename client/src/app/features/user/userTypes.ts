// src/app/features/user/userTypes.ts

import { Order, Product } from "../product/Product";

export interface User {
  userName: string;
  email: string;
  // Add other fields as needed
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
export type { Order };
export type { Product };

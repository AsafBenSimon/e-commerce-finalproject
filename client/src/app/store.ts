// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/auth/authSlice";
import cartReducer from "../app/features/cart//cartSlice";
import userReducer from "../app/features/user/userSlice";
import productReducer from "../app/features/product/productSlice"; // Import the product reducer

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    auth: authReducer,
  },
});

// Define RootState and AppDispatch types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

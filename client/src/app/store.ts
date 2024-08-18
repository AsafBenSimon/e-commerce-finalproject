// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/auth/authSlice";
import userReducer from "../app/features/user/userSlice";
import productReducer from "../app/features/product/productSlice";
import cartReducer from "../app/features/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer, // Add the cart reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

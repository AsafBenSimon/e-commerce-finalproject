// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/auth/authSlice";
import userReducer from "../app/features/user/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

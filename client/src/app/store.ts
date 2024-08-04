// src/store.js
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice.js"; // Import the authReducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

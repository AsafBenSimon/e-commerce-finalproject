// src/app/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../user/userTypes";
import { fetchUserProfile, updateUserProfile } from "../user/userThunk";

const initialState: UserState = {
  profile: null,
  status: "idle",
  error: null,
  pastOrders: [],
  products: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.profile = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.profile = action.payload;
        }
      );
  },
});

export default userSlice.reducer;

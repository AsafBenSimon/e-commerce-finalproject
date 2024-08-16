import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  fetchUserOrders,
  fetchProducts,
  updateUserProfile,
} from "./userThunk";
import type { User, Order, Product } from "./userTypes";

interface UserState {
  profile: User | null;
  pastOrders: Order[];
  products: Product[]; // Added for product storage
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  profile: null,
  pastOrders: [],
  products: [], // Initialize
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.profile = action.payload;
          state.status = "succeeded";
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
          state.status = "succeeded";
        }
      )
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.pastOrders = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;

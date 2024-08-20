// src/app/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cart/cartTypes";
import { addToCart } from "../cart/cartThunk";

// Define the initial state of the cart slice
interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<{ cart: CartItem[] }>) => {
          state.items = action.payload.cart; // Adjust based on what your API returns
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add item to cart";
      });
  },
});

export default cartSlice.reducer;

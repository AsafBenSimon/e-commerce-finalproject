import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartTypes";

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"), // Load from local storage
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Save to local storage
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const updatedItem = action.payload;
      const existingItem = state.items.find((i) => i.id === updatedItem.id);
      if (existingItem) {
        existingItem.quantity = updatedItem.quantity;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== updatedItem.id);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Save to local storage
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Save to local storage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems"); // Clear local storage
    },
    // Define other reducers if necessary
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

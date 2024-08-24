import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartTypes";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  checkout,
} from "./cartThunk";
import { RootState } from "../../store";

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const loadCartItemsFromLocalStorage = (): CartItem[] => {
  try {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Failed to parse cart items from localStorage:", error);
    return [];
  }
};

const initialState: CartState = {
  items: loadCartItemsFromLocalStorage(),
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = []; // Reset the cart items
      localStorage.removeItem("cartItems"); // Remove cart items from localStorage
      console.log("Cart cleared from state and localStorage.");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
          state.status = "succeeded";
          state.error = null;
          localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || "Failed to fetch cart items";
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<{ cart: CartItem[] }>) => {
          state.items = action.payload.cart;
          state.status = "succeeded";
          state.error = null;
          localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || "Failed to add item to cart";
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
          state.status = "succeeded";
          state.error = null;
          localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
      )
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || "Failed to remove item from cart";
      })
      // Checkout
      .addCase(checkout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        console.log("Clearing cart on checkout");
        state.items = []; // Clear the cart after successful checkout
        state.status = "succeeded";
        state.error = null;
        localStorage.removeItem("cartItems"); // Clear cart items from localStorage
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Checkout failed";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export const selectTotalCartItems = (state: RootState) => {
  const items = state.cart.items || [];
  return items.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlice.reducer;

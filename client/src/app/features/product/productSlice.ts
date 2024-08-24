import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./Product"; // Adjust path as necessary
import { fetchProducts } from "./productThunk"; // Import thunk from productThunk
import { RootState } from "../../store";

interface ProductState {
  items: Product[];
  filteredProducts: Product[];
  searchInput: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  filteredProducts: [],
  searchInput: "",
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
      state.filteredProducts = state.items.filter((product) =>
        product.name.toLowerCase().includes(state.searchInput.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.filteredProducts = action.payload; // Show all products initially
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchInput } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.items;
export const selectFilteredProducts = (state: RootState) =>
  state.product.filteredProducts;
export const selectSearchInput = (state: RootState) =>
  state.product.searchInput;

export default productSlice.reducer;

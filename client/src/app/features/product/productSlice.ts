import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductById,
  fetchProducts,
  addReview,
  fetchProductReviews,
} from "./productThunk";
import { Product, Review } from "./Product";
import { RootState } from "../../store";

// Define the ProductState interface
interface ProductState {
  products: Product[]; // All products
  filteredProducts: Product[]; // Products after applying search filter
  searchInput: string; // User's search query
  currentProduct: Product | null; // Single product details
  reviews: Review[]; // Reviews for the current product
  loading: boolean; // Loading state for async operations
  error: string | null; // Error message if any
}

// Initialize the state
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  searchInput: "",
  currentProduct: null,
  reviews: [], // Initialize as an empty array
  loading: false,
  error: null,
};

// Create the product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(state.searchInput.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.currentProduct = action.payload;
          state.loading = false;
          // Optionally, fetch reviews if not handled elsewhere
          // state.reviews = action.payload.reviews || [];
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.filteredProducts = action.payload; // Show all products initially
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.reviews = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Product>) => {
        // Update the current product with the new review
        if (
          state.currentProduct &&
          state.currentProduct._id === action.payload._id
        ) {
          state.currentProduct = action.payload;
        }

        // Optionally, update the product list if the reviewed product is in it
        const productIndex = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (productIndex !== -1) {
          state.products[productIndex] = action.payload;
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Export actions
export const { setSearchInput } = productSlice.actions;

// Selectors
export const selectProducts = (state: RootState) => state.product.products;
export const selectFilteredProducts = (state: RootState) =>
  state.product.filteredProducts;
export const selectSearchInput = (state: RootState) =>
  state.product.searchInput;
export const selectCurrentProduct = (state: RootState) =>
  state.product.currentProduct;
export const selectReviews = (state: RootState) => state.product.reviews;
export const selectLoading = (state: RootState) => state.product.loading;
export const selectError = (state: RootState) => state.product.error;

// Default export
export default productSlice.reducer;

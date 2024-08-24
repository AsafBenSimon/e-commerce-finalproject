// src/types/cartTypes.ts

// src/app/features/cart/cartTypes.ts
export interface CartItem {
  _id: string; // Use _id instead of id
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  img: string;
}

export interface CheckoutPayload {
  products: CartItem[];
  totalPrice: number;
}

export interface RemoveFromCartPayload {
  cart: CartItem[];
}

export const ADD_TO_CART = "cart/addToCart";
export const REMOVE_FROM_CART = "cart/removeFromCart";

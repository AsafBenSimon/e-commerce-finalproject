// src/types/cartTypes.ts

// src/app/features/cart/cartTypes.ts
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  img: string;
}

export interface CartState {
  items: CartItem[];
}

export const ADD_TO_CART = "cart/addToCart";
export const REMOVE_FROM_CART = "cart/removeFromCart";

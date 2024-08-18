export interface CartItem {
  id: string; // Unique identifier for the cart item
  productName: string; // Name of the product
  price: number; // Price of the product
  quantity: number; // Quantity of the product in the cart
  img: string; // URL or path to the product image
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

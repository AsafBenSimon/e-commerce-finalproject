export interface User {
  userName: string;
  email: string;
  // add other fields as needed
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface Order {
  orderId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  totalPrice: number;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  userName: string;
  orders: Order[]; // Include orders in the User interface
}

// src/types/Product.ts
// productTypes.ts
export interface Product {
  productId: string;
  description: string;
  image: any;
  _id: string;
  name: string;
  price: number;
  productName: string;
  img?: string;
  rating?: number;
  sale: number;
  status?: string;
  showStatus?: boolean;
  showSale: boolean;
  quantity?: number; // Add quantity here if it is relevant for your product
}

export interface AddReviewPayload {
  productId: string;
  rating: number;
  comment: string;
  Username: string; // Correct property name
}
// Define the Review type
export interface Review {
  Username: string;
  _id: string;
  user: {
    Username: string;
  };
  rating: number;
  comment: string;
}

import { ReactNode } from "react";

// src/types/Product.ts
export interface Product {
  _id: string;
  quantity: ReactNode;
  productId(productId: any): unknown;
  image: string;
  showSale: boolean | undefined;
  showStatus: boolean | undefined;
  description?: string;
  id: string;
  name: string;
  price: number;
  img: string;
  alt: string;
  sale?: number;
  status?: string;
  rating?: number;
}

export interface Order {
  id: string;
  _id: string;
  createdAt: string;
  products: {
    _id: string;
    productId: string;
    quantity: number;
  }[];
  totalPrice: number;
}

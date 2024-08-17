// src/types/Product.ts
export interface Product {
  _id: string;
  name: string;
  price: number;
  sale?: number;
  showSale?: boolean;
  status?: string;
  showStatus?: boolean;
  img?: string;
  rating?: number;
}

// src/types/ICardProps.ts
// src/types/ICardProps.ts
import { CartItem } from "../app/features/cart/cartTypes";
import { Product } from "../app/features/product/Product";

export interface ICardProps {
  id: string;
  productName: string;
  price: number;
  img: string;
  alt: string;
  onClick: (item: CartItem) => void; // Ensure this matches the expected type
  sale?: number;
  showSale?: boolean;
  status?: string;
  showStatus?: boolean;
  rating?: number;
}

export interface CardProps extends Product {
  onClick: (item: CartItem) => void;
}

export interface CardPageProps {
  products: Product[];
  handleAddToCart: (item: CartItem) => void;
  loading: boolean;
}

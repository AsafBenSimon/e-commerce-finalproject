// src/types/ICardProps.ts
export default interface ICardProps {
  id: string; // Ensure id is always a string
  productName: string;
  price: number;
  sale: number;
  showSale: boolean;
  status: string;
  showStatus: boolean;
  img: string;
  alt: string;
  rating: number;
  onClick?: () => void; // Optional onClick prop
}

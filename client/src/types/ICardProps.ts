// src/types/ICardProps.ts
export default interface ICardProps {
  id: string; // Ensure id is always a string
  productName: string;
  price: number;
  sale?: number; // sale can be undefined
  showSale?: boolean; // showSale can be undefined
  status?: string; // status can be undefined
  showStatus?: boolean; // showStatus can be undefined
  img: string;
  alt?: string; // Make alt optional
  rating: number;
  onClick?: () => void; // Optional onClick prop
}

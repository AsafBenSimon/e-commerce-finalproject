// src/types/ICardProps.ts
interface ICardProps {
  id?: number;
  productName: string;
  price: number;
  sale: number;
  showSale: boolean; // Optional boolean to control sale visibility
  status: string;
  showStatus: boolean; // Optional boolean to control status visibility
  img: string;
  alt: string;
  rating: number;
}

export default ICardProps;

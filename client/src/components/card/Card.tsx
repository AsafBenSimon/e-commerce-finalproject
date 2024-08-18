import React from "react";
import { CartItem } from "../../app/features/cart/cartTypes";
import "./Card.css";
import { ICardProps } from "../../types/ICardProps";

const Card: React.FC<ICardProps> = ({
  id,
  productName,
  price,
  img,
  alt,
  onClick,
  sale,
  showSale,
  status,
  showStatus,
  rating,
}) => {
  const generateStars = (rating: number, count: number = 5) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const isFilled = i < rating;
      stars.push(
        <span
          key={i}
          className={`fa-solid fa-star ${isFilled ? "checked" : ""}`}
        ></span>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id,
      productName,
      price,
      quantity: 1,
      img,
    };
    onClick(cartItem);
  };

  return (
    <div className="card">
      <img src={img} alt={alt} />
      <div className="newOrSale">
        {showSale && sale !== undefined && <div className="sale">-{sale}%</div>}
        {showStatus && status && <div className="new">{status}</div>}
      </div>
      <p className="product-name">{productName}</p>
      <p className="price">₪{price}</p>
      <hr />
      <div className="rating-stars">{generateStars(rating ?? 0)}</div>
      <div className="addToCart" onClick={handleAddToCart}>
        <p>Add to Cart</p>
      </div>
    </div>
  );
};

export default Card;

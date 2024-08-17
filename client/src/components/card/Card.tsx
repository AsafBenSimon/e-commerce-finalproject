import React from "react";
import "./Card.css";
import ICardProps from "../../types/ICardProps";

const Card: React.FC<ICardProps> = ({
  id,
  productName,
  price,
  sale,
  showSale,
  status,
  showStatus,
  img,
  alt,
  rating,
  onClick,
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

  return (
    <div className="card">
      {/* Image */}
      <img src={img} alt={alt} />
      <div className="newOrSale">
        {showSale && sale !== undefined && <div className="sale">-{sale}%</div>}
        {showStatus && status && <div className="new">{status}</div>}
      </div>
      <p className="product-name">{productName}</p>
      <p className="price">₪{price}</p>
      <hr />
      <div className="rating-stars">{generateStars(rating, 5)}</div>
      <div className="addToCart" onClick={onClick}>
        <p>Add to Cart</p>
      </div>
    </div>
  );
};

export default Card;

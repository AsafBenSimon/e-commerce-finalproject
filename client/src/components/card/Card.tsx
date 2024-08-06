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
}) => {
  // Function to generate star elements
  const generateStars = (rating: number, count: number = 5) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const isFilled = i < rating; // Check if the star should be filled
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
    <>
      <div className="card">
        <div className="newOrSale">
          <div className="newOrSale">
            {showSale && sale !== undefined && (
              <div className="sale">-{sale}%</div>
            )}
            {showStatus && status && <div className="new">{status}</div>}
          </div>
        </div>
        <img src={img} alt={alt} />
        <div className="lowerCard"></div>
        <p className="product-name">{productName}</p>
        <p className="price">₪{price}</p>
        <hr /> {/* Horizontal line */}
        <div className="rating-stars">
          {generateStars(rating, 5)}{" "}
          {/* Display 5 stars; adjust count as needed */}
        </div>
        <div className="addToCart">
          <p>add to cart</p>
        </div>
      </div>
    </>
  );
};

export default Card;

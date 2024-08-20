// src/components/Card.tsx
import React from "react";
import "./Card.css";
import ICardProps from "../../types/ICardProps";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartThunk"; // Adjust path if needed
import { CartItem } from "../../app/features/cart/cartTypes"; // Adjust path if needed

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
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id, // Ensure this matches your CartItem type
      productId: id,
      productName: productName || "", // Provide default if undefined
      price: price || 0, // Provide default if undefined
      quantity: 1, // Default quantity
      img: img || "", // Provide default if undefined
    };

    // Dispatch the addToCart thunk with the CartItem object
    dispatch(addToCart(cartItem) as any);
  };

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
      <div className="addToCart" onClick={handleAddToCart}>
        <p>Add to Cart</p>
      </div>
    </div>
  );
};

export default Card;

import React, { useState } from "react";
import "./Card.css";
import ICardProps from "../../types/ICardProps";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartThunk";
import { CartItem } from "../../app/features/cart/cartTypes";
import { AppDispatch } from "../../app/store";

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
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in or re-log in to add items to the cart.");
      return;
    }

    const cartItem: CartItem = {
      _id: id,
      productId: id,
      productName: productName ?? "Default Product Name",
      price: price ?? 0,
      quantity: 1,
      img: img ?? "default-image-url",
    };

    setLoading(true);

    try {
      const resultAction = await dispatch(addToCart(cartItem));
      if (addToCart.fulfilled.match(resultAction)) {
        console.log("Item added to cart:", resultAction.payload);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setLoading(false);
    }
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
      <button
        className="addToCart"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? <p>Adding to Cart...</p> : <p>Add to Cart</p>}
      </button>
    </div>
  );
};

export default Card;

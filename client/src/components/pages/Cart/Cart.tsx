// src/components/CartPage.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CartPage.css";
import { removeFromCart } from "../../../app/features/cart/cartThunk";
import { RootState, AppDispatch } from "../../../app/store";

const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.productName} />
            <div>
              <p>{item.productName}</p>
              <p>₪{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;

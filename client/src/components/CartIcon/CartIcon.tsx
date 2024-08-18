// CartIcon.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./CartIcon.css"; // Ensure you have styles for the cart icon

const CartIcon: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-icon">
      <i className="fa-solid fa-shopping-cart"></i>
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </div>
  );
};

export default CartIcon;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import {
  removeFromCart,
  checkout,
  loadCartItems,
} from "../../../app/features/cart/cartThunk";
import "./Cart.css";

const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      const items = JSON.parse(storedItems);
      dispatch(loadCartItems(items)); // Dispatch action to load cart items
    }
  }, [dispatch]);

  // Debugging: Check cart items
  console.log("Cart Items:", cartItems);

  const handleRemoveFromCart = (productId: string) => {
    console.log("Removing item with Product ID:", productId);
    dispatch(removeFromCart(productId));
  };

  // Calculate total cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle checkout
  const handleCheckout = async () => {
    const payload = {
      products: cartItems,
      totalPrice: totalCost,
    };

    try {
      await dispatch(checkout(payload)).unwrap(); // Unwrap to handle errors
      // Optional: Add a success message or redirect here
    } catch (error) {
      console.error("Checkout failed:", error);
      // Optional: Show an error message to the user
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-page">
        <h2>Your Cart</h2>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  className="cart-img"
                  src={item.img}
                  alt={item.productName}
                />
                <div>
                  <p>{item.productName}</p>
                  <p>₪{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleRemoveFromCart(item.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: ₪{totalCost.toFixed(2)}</h3>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;

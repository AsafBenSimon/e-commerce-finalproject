import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import {
  removeFromCart,
  checkout,
  loadCartItems,
} from "../../../app/features/cart/cartThunk";
import "./Cart.css";
import { CartItem } from "../../../app/features/cart/cartTypes";

const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItemsFromStore = useSelector(
    (state: RootState) => state.cart.items
  );

  // Local state for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Sync local state with Redux store
  useEffect(() => {
    setCartItems(cartItemsFromStore);
  }, [cartItemsFromStore]);

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
    dispatch(removeFromCart(productId))
      .unwrap()
      .then((updatedCartItems) => {
        setCartItems(updatedCartItems); // Update local state
      })
      .catch((error) => {
        console.error("Failed to remove item:", error);
      });
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
      setCartItems([]); // Clear local state
      localStorage.removeItem("cartItems"); // Clear local storage
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

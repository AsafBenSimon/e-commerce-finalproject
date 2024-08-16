// src/components/newcomponant/LastOrders.tsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchUserOrders,
  fetchProducts,
} from "../../app/features/user/userThunk";
import "./LastOrders.css";
import { Order, Product } from "../../app/features/user/userTypes";

const LastOrders: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const pastOrders = useSelector((state: RootState) => state.user.pastOrders);
  const products = useSelector((state: RootState) => state.user.products);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchUserOrders()).unwrap();
        await dispatch(fetchProducts()).unwrap();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData(); // Fetch orders and products on component mount
  }, [dispatch]);

  const getProductName = (productId: string): string => {
    const product = products.find((p) => p._id === productId);
    return product ? product.name : "Unknown Product";
  };

  return (
    <div className="orders-section">
      <h2>Your Past Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : status === "failed" ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {pastOrders.length > 0 ? (
            <ul>
              {pastOrders.map((order: Order) => (
                <li key={order.id} className="order-item">
                  <div>
                    <strong>Order ID:</strong> {order._id}
                  </div>
                  <div>
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </div>
                  <div>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Products:</strong>
                    <ul>
                      {order.products.map((product, index) => (
                        <li key={product._id || `${order.id}-${index}`}>
                          {/* Use product._id if available; otherwise use a combination of order ID and index */}
                          Product Name: {getProductName(product.productId)},
                          Quantity: {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No past orders found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default LastOrders;

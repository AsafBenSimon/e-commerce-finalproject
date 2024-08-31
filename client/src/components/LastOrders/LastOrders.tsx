import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchUserOrders,
  fetchProducts,
} from "../../app/features/user/userThunk";
import "./LastOrders.css";
import { Order } from "../../app/features/user/userTypes";
import { Product } from "../../app/features/product/Product";

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
            <ul className="order-list">
              {pastOrders.map((order: Order) => (
                <li key={order._id} className="order-item">
                  <div className="order-details">
                    <div>
                      <strong>Order ID:</strong> {order._id}
                    </div>
                    <div>
                      <strong>Order Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Products:</strong>
                      <ul className="product-list">
                        {order.products.map((product, index) => {
                          // Find the product by ID
                          const productDetails = products.find(
                            (p: Product) => p._id === product.productId
                          );
                          return (
                            <li
                              key={product.productId || `${order._id}-${index}`}
                              className="product-item"
                            >
                              <div>
                                <strong>Product Name:</strong>{" "}
                                {productDetails
                                  ? productDetails.name
                                  : "Unknown Product"}
                              </div>
                              <div>
                                <strong>Quantity:</strong> {product.quantity}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div>
                        <strong>Total Price:</strong> ₪{order.totalPrice}
                      </div>
                    </div>
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

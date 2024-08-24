import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchProductById } from "../../../app/features/product/productThunk";
import { addToCart } from "../../../app/features/cart/cartThunk";
import { CartItem } from "../../../app/features/cart/cartTypes";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState<any>(null); // Any type to avoid type issues
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await dispatch(fetchProductById(id!)).unwrap();
        setProduct(productData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!product || loadingAddToCart) return;

    setLoadingAddToCart(true);

    const cartItem: CartItem = {
      _id: product._id,
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      img: product.image
        ? `/assets/img/${product.image}`
        : "/assets/img/default.png",
    };

    try {
      await dispatch(addToCart(cartItem));
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    } finally {
      setLoadingAddToCart(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-detail">
      {product ? (
        <>
          <div className="product-header">
            <img
              src={
                product.image
                  ? `/assets/img/${product.image}`
                  : "/assets/img/default.png"
              }
              alt={product.name || "Product Image"}
              className="product-image"
            />
            <div className="product-info">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-price">₪{product.price}</p>
              {product.showSale && product.sale !== undefined && (
                <div className="product-sale">-{product.sale}%</div>
              )}
              {product.showStatus && product.status && (
                <div className="product-status">{product.status}</div>
              )}
              <div className="product-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`fa-solid fa-star ${
                      i < product.rating ? "checked" : ""
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
          <p className="product-description">{product.description}</p>
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={loadingAddToCart}
          >
            {loadingAddToCart ? "Adding..." : "Add to Cart"}
          </button>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;

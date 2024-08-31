import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  fetchProductById,
  fetchProductReviews,
  addReview,
} from "../../../app/features/product/productThunk";
import { addToCart } from "../../../app/features/cart/cartThunk";
import { CartItem } from "../../../app/features/cart/cartTypes";
import "./ProductDetail.css";
import { Review } from "../../../app/features/product/Product";

// Define the AddReviewPayload type if it's not already defined
interface AddReviewPayload {
  productId: string;
  rating: number;
  comment: string;
  Username: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState<any>(null); // Any type to avoid type issues
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const reviews = useSelector((state: RootState) => state.product.reviews);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await dispatch(fetchProductById(id!)).unwrap();
        setProduct(productData);

        // Fetch reviews after the product is loaded
        const reviewsData = await dispatch(fetchProductReviews(id!)).unwrap();
        dispatch({
          type: "product/fetchProductReviews/fulfilled",
          payload: reviewsData,
        }); // Update reviews in the state
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

  const handleReviewSubmit = async () => {
    if (!product) return;

    const reviewPayload: AddReviewPayload = {
      productId: product._id,
      rating,
      comment: review,
      Username: "current_user", // Replace with the actual username from your authentication logic
    };

    try {
      await dispatch(addReview(reviewPayload)).unwrap();
      setReview(""); // Clear review input after submission
      setShowReviewForm(false); // Hide review form after submission

      // Refresh reviews after adding a new review
      const reviewsData = await dispatch(fetchProductReviews(id!)).unwrap();
      dispatch({
        type: "product/fetchProductReviews/fulfilled",
        payload: reviewsData,
      }); // Update reviews in the state
    } catch (err) {
      console.error("Failed to submit review:", err);
      const errorMessage = typeof err === "string" ? err : JSON.stringify(err);
      alert(`Failed to submit review: ${errorMessage}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    const errorMessage =
      typeof error === "string" ? error : JSON.stringify(error);
    return <p>Error: {errorMessage}</p>;
  }

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

          <div className="review-section">
            {showReviewForm ? (
              <div className="review-form">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here"
                />
                <div className="rating-select">
                  <label htmlFor="rating">Rating:</label>
                  <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="1"
                    max="5"
                  />
                </div>
                <button
                  className="add-review-button"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </button>
                <button
                  className="add-review-button"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="add-review-button"
                onClick={() => setShowReviewForm(true)}
              >
                Add Review
              </button>
            )}
          </div>

          <div className="reviews-list">
            {reviews && reviews.length > 0 ? (
              reviews.map((review: Review) => (
                <div key={review._id} className="review">
                  <p>
                    <strong>{review.user?.Username || "Anonymous"}</strong>
                    <span>Rating: {review.rating}</span>
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;

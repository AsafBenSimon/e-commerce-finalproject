import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import { fetchProducts } from "../../app/features/product/productThunk";
import { RootState, AppDispatch } from "../../app/store";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./CardPage.css";
import { Product } from "../../app/features/product/Product";
import { CartItem } from "../../app/features/cart/cartTypes";

const ITEMS_PER_PAGE = 9;

const CardPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  const maxPrice = Math.max(
    ...products.map((product: { price: any }) => product.price),
    0
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filteredProducts = priceFilter
      ? products.filter(
          (product: { price: number }) => product.price <= priceFilter
        )
      : products;

    setCurrentItems(filteredProducts.slice(startIndex, endIndex));
  }, [products, currentPage, priceFilter]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(
    (priceFilter
      ? products.filter(
          (product: { price: number }) => product.price <= priceFilter
        ).length
      : products.length) / ITEMS_PER_PAGE
  );

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1, // default quantity
      img: product.image,
    };

    console.log("Adding to cart:", cartItem);
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="card-page-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="filter-container">
        <label htmlFor="priceFilter" className="filter-label">
          Filter by price:
        </label>
        <input
          type="number"
          id="priceFilter"
          min="0"
          max={maxPrice}
          placeholder={`Up to ${maxPrice}`}
          value={priceFilter || ""}
          onChange={(e) =>
            setPriceFilter(e.target.value ? parseFloat(e.target.value) : null)
          }
          className="filter-input"
        />
      </div>

      <div className="CardPage">
        {currentItems.length > 0
          ? currentItems.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                productName={item.name}
                price={item.price}
                sale={item.sale}
                showSale={item.showSale}
                status={item.status}
                showStatus={item.showStatus}
                img={`/assets/img/${item.image}`}
                alt={item.name}
                rating={item.rating}
                onClick={() => handleAddToCart(item)}
              />
            ))
          : !loading && <p>No products available.</p>}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardPage;

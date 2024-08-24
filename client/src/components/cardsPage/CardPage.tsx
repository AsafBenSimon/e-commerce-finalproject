import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import { fetchProducts } from "../../app/features/product/productThunk";
import { RootState, AppDispatch } from "../../app/store";
import "./CardPage.css";

const ITEMS_PER_PAGE = 9;

const CardPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filteredProducts = [...products]; // Create a copy of the products array

    if (maxPrice !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (sortOrder) {
      filteredProducts.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentItems(filteredProducts.slice(startIndex, endIndex));
  }, [products, currentPage, maxPrice, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value) || null);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const totalPages = Math.ceil(
    (maxPrice !== null ? currentItems.length : products.length) / ITEMS_PER_PAGE
  );

  return (
    <div className="card-page-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Filter and Sort Controls */}
      <div className="filter-container">
        <label htmlFor="price-filter">Filter by Price: </label>
        <input
          type="number"
          id="price-filter"
          value={maxPrice || ""}
          onChange={handlePriceChange}
          placeholder="Enter max price"
        />

        <label htmlFor="sort-order">Sort by Price: </label>
        <select id="sort-order" value={sortOrder} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="CardPage">
        {currentItems.length > 0
          ? currentItems.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                productName={item.name}
                price={item.price}
                sale={item.sale}
                showSale={item.showSale}
                status={item.status}
                showStatus={item.showStatus}
                img={`/assets/img/${item.image}`}
                alt={item.name}
                rating={item.rating}
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

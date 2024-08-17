import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import { fetchProducts } from "../../app/features/product/productThunk";
import { RootState, AppDispatch } from "../../app/store";
import "./CardPage.css";

const ITEMS_PER_PAGE = 9;

const CardPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Specify the correct dispatch type
  const products = useSelector((state: RootState) => state.product.items);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchProducts()); // Now dispatch is correctly typed
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentItems(products.slice(startIndex, endIndex));
  }, [products, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="card-page-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="CardPage">
        {currentItems.length > 0
          ? currentItems.map((item, index) => (
              <Card
                key={index}
                id={item._id} // Using _id from your database
                productName={item.name} // Use correct field names
                price={item.price}
                sale={item.sale}
                showSale={item.showSale}
                status={item.status}
                showStatus={item.showStatus}
                img={`/assets/img/${item.image}`} // Construct the correct path
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

        {/* Dynamically create page number buttons */}
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

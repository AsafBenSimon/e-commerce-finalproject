import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../app/features/product/productSlice";
import { fetchProducts } from "../../../app/features/product/productThunk";
import Card from "../../card/Card";
import "./HotDealsPage.css";
import { AppDispatch, RootState } from "../../../app/store";
import { Product } from "../../../app/features/product/Product";

const HotDealsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => selectProducts(state));
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch all products
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      // Log all products
      console.log("All Products:", products);

      // Filter products that are on sale
      const filteredProducts = products.filter((product) => product.sale > 0);
      setSaleProducts(filteredProducts);

      // Log filtered sale products
      console.log("Filtered Sale Products:", filteredProducts);
    }
  }, [products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className="hot-deals-page">
      <h2>Hot Deals</h2>
      <div className="products-container">
        {saleProducts.length > 0 ? (
          saleProducts.map((product: Product) => (
            <Card
              key={product._id}
              id={product._id}
              productName={product.name}
              price={product.price}
              sale={product.sale || 0}
              showSale={product.showSale || false}
              status={product.status || ""}
              showStatus={product.showStatus || false}
              img={product.image ? `/assets/img/${product.image}` : ""}
              alt={product.name || "Product Image"}
              rating={product.rating || 0}
            />
          ))
        ) : (
          <p>No hot deals available.</p>
        )}
      </div>
    </div>
  );
};

export default HotDealsPage;

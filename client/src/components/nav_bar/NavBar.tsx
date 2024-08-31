import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalCartItems } from "../../app/features/cart/cartSlice";
import { RootState } from "../../app/store";
import { setSearchInput } from "../../app/features/product/productSlice";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useSelector(selectTotalCartItems);
  const searchInput = useSelector(
    (state: RootState) => state.product.searchInput
  );
  const filteredProducts = useSelector(
    (state: RootState) => state.product.filteredProducts
  );

  // Clear search input when location changes (e.g., user navigates to a new page)
  useEffect(() => {
    dispatch(setSearchInput(""));
  }, [location, dispatch]);

  // Handle search button click
  const handleSearch = () => {
    if (!searchInput || filteredProducts.length === 0) {
      // Do nothing if searchInput is empty or no products are filtered
      return;
    }
    navigate(`/product/${filteredProducts[0]._id}`);
  };

  return (
    <div className="NavBar">
      <div className="container2">
        <h1 className="main-Name">
          <Link to="/" className="main-Name-Link">
            Electrick<span className="dot"></span>
          </Link>
        </h1>
        <div className="NavBar-MiniContainer">
          <div className="NavBar-Search">
            <input
              className="Search"
              type="text"
              placeholder="Search here"
              value={searchInput}
              onChange={(e) => dispatch(setSearchInput(e.target.value))}
            />
            <button
              className="search-button"
              type="button"
              onClick={handleSearch} // Attach the search handler
            >
              Search
            </button>
            {searchInput && filteredProducts.length > 0 && (
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="search-result-item"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="NavBar-Cart">
            <Link to="/cart" className="cart-link">
              <img className="svg-cart" src="/assets/img/cart.png" alt="Cart" />
              <span>
                <span className="cart-text">Your Cart</span>
                <span className="cart-count">{totalItems}</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

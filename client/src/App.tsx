import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import MiniNav from "./components/miniNav/MiniNav";
import NavBar from "./components/nav_bar/NavBar";
import ShopNav from "./components/shopNav/ShopNav";
import CardPage from "./components/cardsPage/CardPage";
import AboutUs from "./components/aboutUs/aboutUs";
import SignIn from "./components/pages/SignIn/SignIn";
import Register from "./components/pages/Register/Register";
import Profile from "./components/pages/Profile/Profile";
import Cart from "./components/pages/Cart/Cart";
import HotDealsPage from "./components/pages/HotDealsPage/HotDealsPage";
import ProductDetail from "./components/pages/ProductDetail/ProductDetail";

const RoutesWrapper = () => {
  const location = useLocation();
  const showAboutUs = !["/sign-in", "/register"].includes(location.pathname);
  const showNavBar = !["/sign-in", "/register"].includes(location.pathname);
  const showShopNav = !["/sign-in", "/register"].includes(location.pathname);

  return (
    <div className="main-content">
      {showNavBar && <NavBar />} {/* Conditionally render NavBar */}
      {showShopNav && <ShopNav />} {/* Conditionally render ShopNav */}
      <Routes>
        <Route path="/" element={<CardPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/hot-deals" element={<HotDealsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      {showAboutUs && <AboutUs />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <MiniNav />
        <RoutesWrapper />
      </div>
    </Router>
  );
}

export default App;

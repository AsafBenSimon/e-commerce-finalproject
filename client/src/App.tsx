import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MiniNav from "./components/miniNav/MiniNav";
import NavBar from "./components/nav_bar/NavBar";
import ShopNav from "./components/shopNav/ShopNav";
import CardPage from "./components/cardsPage/CardPage";
import AboutUs from "./components/aboutUs/aboutUs";
import SignIn from "./components/pages/SignIn/SignIn";
import Register from "./components/pages/Register/Register";
import Profile from "./components/pages/Profile/Profile";
import CartPage from "./components/pages/CartPage/Cart"; // Import CartPage component
import Cart from "./components/pages/CartPage/Cart";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MiniNav />
                <NavBar />
                <ShopNav />
                <CardPage />
                <AboutUs />
              </>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add route for CartPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

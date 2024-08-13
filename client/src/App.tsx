import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MiniNav from "./components/miniNav/MiniNav";
import NavBar from "./components/nav_bar/NavBar";
import ShopNav from "./components/shopNav/ShopNav";
import CardPage from "./components/cardsPage/CardPage";
import AboutUs from "./components/aboutUs/aboutUs";
import SignIn from "./components/pages/SignIn/SignIn";
import Register from "./components/pages/Register/Register"; // Import Register component

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
          <Route path="/register" element={<Register />} />{" "}
          {/* Add route for Register */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

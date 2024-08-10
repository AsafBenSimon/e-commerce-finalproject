import "./App.css";
import AboutUs from "./components/aboutUs/aboutUs";
import CardPage from "./components/cardsPage/CardPage";
import MiniNav from "./components/miniNav/MiniNav";
import NavBar from "./components/nav_bar/NavBar";
import ShopNav from "./components/shopNav/ShopNav";

function App() {
  return (
    <>
      <div className="App">
        <div className="container">
          <MiniNav />
          <NavBar />
          <ShopNav />
          <CardPage />
          <AboutUs />
        </div>
      </div>
    </>
  );
}

export default App;

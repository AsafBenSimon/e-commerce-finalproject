import "./App.css";
import Card from "./components/card/Card";
import NavBar from "./components/nav_bar/NavBar";

function App() {
  return (
    <>
      <div className="App">
        <div className="container">
          <NavBar />
          <Card
            productName={"laptop electrick"}
            price={1300}
            showSale={true}
            status={"NEW"}
            showStatus={true}
            sale={30}
            img={"assets/img/product01.png"}
            alt={"a laptop"}
            rating={4}
          />
        </div>
      </div>
    </>
  );
}

export default App;

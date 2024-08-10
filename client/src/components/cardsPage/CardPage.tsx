import React from "react";
import Card from "../card/Card";
import "./CardPage.css";

const CardPage: React.FC = () => {
  const items = [
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
    {
      productName: "Tablet",
      price: 500,
      sale: 0,
      showSale: false,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 5,
    },
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
    {
      productName: "Tablet",
      price: 299,
      sale: 10,
      showSale: true,
      status: "NEW",
      showStatus: true,
      img: "assets/img/product01.png",
      alt: "Product Image",
      rating: 4.2,
    },
  ];

  return (
    <div className="card-page-container">
      <div className="CardPage">
        {items.map((item) => (
          <Card
            productName={item.productName}
            price={item.price}
            sale={item.sale}
            showSale={item.showSale}
            status={item.status}
            showStatus={item.showStatus}
            img={item.img}
            alt="Product Image"
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default CardPage;

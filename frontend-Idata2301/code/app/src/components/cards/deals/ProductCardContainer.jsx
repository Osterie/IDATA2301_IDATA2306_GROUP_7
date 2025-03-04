import React from "react";
import "./productCardContainer.css";
import ProductCard from "./ProductCard";

const products = [
  { id: 1, title: "Product 1", description: "This is a very good product", img: "https://picsum.photos/250/150?rnd=1" },
  { id: 2, title: "Product 2", description: "This product is not that good, but we need to clear the stock anyway", img: "https://picsum.photos/250/150?rnd=2", highlighted: true },
  { id: 3, title: "Product 3", description: "This is another product", img: "https://picsum.photos/250/150?rnd=3" },
  { id: 4, title: "Product 4", description: "You can get this for free in GitHub, but we need money", img: "https://picsum.photos/250/150?rnd=4" }
];

const ProductContainer = () => {
  return (
    <section className="product-container">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
};

export default ProductContainer;



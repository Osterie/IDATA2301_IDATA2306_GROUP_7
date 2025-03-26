import React, { useEffect, useState } from "react";
import "./productCardContainer.css";
import ProductCard from "./ProductCard";

const ProductContainer = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRandomFlights = async () => {
      try {
        setLoading(true); 
        const response = await fetch("http://localhost:8080/getRandomFlights", {
          method: "POST",
          headers: { "Content-Type": "application/json",},
          body: JSON.stringify({ count: 6 }), // Number of requested flights
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Parses the JSON response
        setProducts(data); 
      } catch (e) {
        setError(e.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRandomFlights();
  }, []); 

  if (loading) {
    return <p>Loading flights...</p>; // Displays loading message while fetching
  }

  if (error) {
    return <p>Error: {error}</p>; // Displays error message if something goes wrong
  }

  return (
    <section className="product-container">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
};

export default ProductContainer;
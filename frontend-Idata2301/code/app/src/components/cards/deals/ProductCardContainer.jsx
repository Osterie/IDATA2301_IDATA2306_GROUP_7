import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productCardContainer.css";
import ProductCard from "./ProductCard";

const API_BASE_URL = "http://localhost:3000/api/flights";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch the cheapest flight
        const cheapestResponse = await axios.post(`${API_BASE_URL}/cheapest`);
        const cheapestFlight = cheapestResponse.data;

        // Fetch flights departing tomorrow
        const tomorrowResponse = await axios.post(`${API_BASE_URL}/tomorrow`);
        const flightsTomorrow = tomorrowResponse.data;

        // Fetch 4 random flights
        const randomResponse = await axios.post(`${API_BASE_URL}/random`, { count: 4 });
        const randomFlights = randomResponse.data;

        // Combine all flights into a single array
        const combinedProducts = [
          { ...cheapestFlight, highlighted: true },
          ...flightsTomorrow,
          ...randomFlights,
        ];

        setProducts(combinedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
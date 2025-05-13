import React, { useState, useEffect } from "react";
import "./productCardContainer.css";
import ProductCard from "./ProductCard";
import flightHeroImage from "../../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg"; 
import { sendApiRequest } from "../../../library/requests"; // Adjust the import path as necessary

const API_BASE_URL = "http://localhost:8080/api/flights";

const ProductContainer = ({
  setFlight, 
  setActivePage    
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const description = "Discover amazing flight deals and travel experiences.";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = [];
  
        console.log("Fetching the cheapest flight...");
        await sendApiRequest(
          "GET",
          "/flights/cheapest",
          (cheapestFlight) => {
            allProducts.push({
              ...cheapestFlight,
              highlighted: true,
              description: "Cheap flight",
              date: cheapestFlight.scheduledFlight.date,
              price: cheapestFlight.price,
              currencyCode: cheapestFlight.currencyCode,
              
            });
          },
          null,
          (error) => {
            console.error("Error fetching the cheapest flight:", error);
          }
        );
  
        console.log("Fetching flights departing today...");
        await sendApiRequest(
          "GET",
          "/flights/today",
          (flightsToday) => {
            allProducts.push(
              ...flightsToday.map((flight) => ({
                ...flight,
                description: "Fly today",
                date: flight.scheduledFlight.date,
                price: flight.price,
                currencyCode: flight.currencyCode,
              }))
            );
          },
          null,
          (error) => {
            console.error("Error fetching flights departing today:", error);
          }
        );
  
        console.log("Fetching flights departing tomorrow...");
        await sendApiRequest(
          "GET",
          "/flights/tomorrow",
          (flightsTomorrow) => {
            allProducts.push(
              ...flightsTomorrow.map((flight) => ({
                ...flight,
                description: "Fly tomorrow",
                date: flight.scheduledFlight.date,
                price: flight.price,
                currencyCode: flight.currencyCode,

              }))
            );
          },
          null,
        );

        
        await sendApiRequest(
          "GET",
          "/flights/highest-discount",
          (discountFlight) => {
            allProducts.push(
              ...discountFlight.map((flight) => ({
                ...flight,
                description: "Highest discounted flight",
                date: flight.scheduledFlight.date,
                price: flight.price,
                currencyCode: flight.currencyCode,
              }))
            );
          },
          null,
        );

        await sendApiRequest(
          "GET",
          "/flights/random", 
          (randomFlight) => {
            allProducts.push(
              ...randomFlight.map((flight) => ({
                ...flight,
                description: "Most popular flight",
                date: flight.scheduledFlight.date,
                price: flight.price,
                currencyCode: flight.currencyCode,

              }))
            );
          },
          null,
        );

        await sendApiRequest(
          "GET",
          "/flights/random",
          (randomFlight) => {
            allProducts.push(
              ...randomFlight.map((flight) => ({
                ...flight,
                description: "Another popular flight",
                date: flight.scheduledFlight.date,
                price: flight.price,
                currencyCode: flight.currencyCode,

              }))
            );
          },
          null,
        );

            
  
        // Update the state once with all products
        setProducts(allProducts);
        setLoading(false);
      } catch (err) {
        console.error("Unexpected error fetching products:", err);
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
    {products.map((product, index) => (
      <ProductCard
        key={index}
        description={product.description || "No description available"}
        img={flightHeroImage}
        date={product.date || "No date available"}
        price={product.price || "No price available"}
        currencyCode={product.currencyCode}
        highlighted={product.highlighted || false}
        setFlight={setFlight}
        setActivePage={setActivePage}
      />
    ))}
</section>
  );
};

export default ProductContainer;
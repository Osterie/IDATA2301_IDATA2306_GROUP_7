import { useState, useEffect } from "react";
import "./productCardContainer.css";
import ProductCard from "./ProductCard";
import { sendApiRequest } from "../../../library/requests";

const ProductContainer = ({ setSelectedFlight, setActivePage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = [];

        await sendApiRequest("GET", "/flights/tomorrow", (flightsTomorrow) => {
          allProducts.push(...flightsTomorrow.map((flight) => ({
            ...flight,
            description: "Fly tomorrow",
            date: flight.scheduledFlight.date,
            price: flight.price,
            currencyCode: flight.currencyCode,
          })));
        });

        await sendApiRequest("GET", "/flights/highest-discount", (discountFlight) => {
          allProducts.push(...discountFlight.map((flight) => ({
            ...flight,
            description: "Highest discounted flight",
            date: flight.scheduledFlight.date,
            price: flight.price,
            currencyCode: flight.currencyCode,
          })));
        });

        await sendApiRequest("GET", "/flights/random", (randomFlight) => {
          allProducts.push(...randomFlight.map((flight) => ({
            ...flight,
            description: "Most popular flight",
            date: flight.scheduledFlight.date,
            price: flight.price,
            currencyCode: flight.currencyCode,
          })));
        });

        await sendApiRequest("GET", "/flights/random", (randomFlight) => {
          allProducts.push(...randomFlight.map((flight) => ({
            ...flight,
            description: "Another popular flight",
            date: flight.scheduledFlight.date,
            price: flight.price,
            currencyCode: flight.currencyCode,
          })));
        });

        await sendApiRequest("GET", "/flights/random", (randomFlight) => {
          allProducts.push(...randomFlight.map((flight) => ({
            ...flight,
            description: "You might like this flight",
            date: flight.scheduledFlight.date,
            price: flight.price,
            currencyCode: flight.currencyCode,
          })));
        });

        await sendApiRequest("GET", "/flights/random", (randomFlight) => {
          allProducts.push(...randomFlight.map((flight) => ({
            ...flight,
            description: "Our recommendation for you",
            date: flight.scheduledFlight.date,
            price: flight.price,
            currencyCode: flight.currencyCode,
          })));
        });

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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="product-list" aria-label="Flight deals">
      <header className="product-list-header">
        <h2>Explore Featured Flights</h2>
        <p>Carefully selected flight options for every kind of traveler.</p>
      </header>

      <div className="product-container">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            flight={product}
            setSelectedFlight={setSelectedFlight}
            setActivePage={setActivePage}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductContainer;

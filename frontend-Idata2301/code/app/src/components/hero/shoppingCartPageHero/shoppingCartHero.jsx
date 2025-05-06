import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import "./shoppingCartHero.css"; 

const ShoppingCartHero = () => {
  const [cart, setCart] = useState([]); // State to store flights in the shopping cart
  const [availableFlights, setAvailableFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the shopping cart from cookies when the component mounts
  useEffect(() => {
    const savedCart = Cookies.get("shoppingCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // Parse the JSON string back into an array
    }
  }, []);

  // Fetch flights from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("/api/flights");
        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }
        const data = await response.json();
        setAvailableFlights(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to add a flight to the shopping cart
  const addToCart = (flight) => {
    if (!cart.some((item) => item.id === flight.id)) {
      const updatedCart = [...cart, flight];
      setCart(updatedCart);
      Cookies.set("shoppingCart", JSON.stringify(updatedCart), { expires: 7 }); // Save to cookies (expires in 7 days)
    } else {
      alert("This flight is already in your shopping cart!");
    }
  };

  // Function to remove a flight from the shopping cart
  const removeFromCart = (flightId) => {
    const updatedCart = cart.filter((item) => item.id !== flightId);
    setCart(updatedCart);
    Cookies.set("shoppingCart", JSON.stringify(updatedCart), { expires: 7 }); // Update cookies
  };

  if (loading) {
    return <p>Loading flights...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="hero">
      <div className="shopping-cart-container">
        <h1>Shopping Cart</h1>
        <p>Manage your selected flights below:</p>

        {/* Available Flights */}
        <div className="available-flights">
          <h2>Available Flights</h2>
          {availableFlights.length > 0 ? (
            <ul>
              {availableFlights.map((flight) => (
                <li key={flight.id}>
                  <strong>{flight.flightNumber}</strong> - {flight.airline} <br />
                  Departure: {flight.departure} | Arrival: {flight.arrival} <br />
                  Price: ${flight.price} <br />
                  <button onClick={() => addToCart(flight)}>Add to Cart</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No flights available.</p>
          )}
        </div>

        {/* Shopping Cart */}
        <div className="cart">
          <h2>Your Shopping Cart</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((flight) => (
                <li key={flight.id}>
                  <strong>{flight.flightNumber}</strong> - {flight.airline} <br />
                  Departure: {flight.departure} | Arrival: {flight.arrival} <br />
                  Price: ${flight.price} <br />
                  <button onClick={() => removeFromCart(flight.id)}>
                    Remove from Cart
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your shopping cart is empty.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartHero;
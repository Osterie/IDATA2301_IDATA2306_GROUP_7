import React from "react";
import axios from "axios";
import { clearShoppingCart } from "../../../utils/shoppingCartUtils";

import "./purchaseHero.css";

const PurchaseHero = ({ cartFlights }) => {

  const API_URL = "http://localhost:3000/api/favorites";// Replace with correct API endpoint

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      fullName: formData.get("full-name"),
      email: formData.get("email"),
      flights: cartFlights,
    };

    try {
      // Send a POST request to the backend
      const response = await axios.post(API_URL, data);
      console.log("Purchase successful:", response.data);

      // Clear the shopping cart
      clearShoppingCart();

      // Show a success message or redirect the user
      alert("Purchase completed successfully!");
    } catch (error) {
      console.error("Error completing purchase:", error);
      alert("Failed to complete purchase. Please try again.");
    }
  };


  return (
    <section className="hero">
      <div className="purchase-hero-container">
        <h1>Complete Your Purchase</h1>
        <p>Fill in your details to finalize your booking!</p>

        {/* Display Flights in the Shopping Cart */}
        <div className="cart-flights">
          <h2>Your Selected Flights</h2>
          {cartFlights && cartFlights.length > 0 ? (
            <ul>
              {cartFlights.map((flight, index) => (
                <li key={index}>
                  <strong>{flight.flightNumber}</strong> - {flight.airline} <br />
                  Departure: {flight.departure} | Arrival: {flight.arrival} <br />
                  Price: ${flight.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your shopping cart is empty.</p>
          )}
        </div>

        {/* Purchase Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="full-name">Full Name:</label>
            <input type="text" id="full-name" name="full-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit">Complete Purchase</button>
        </form>
      </div>
    </section>
  );
};

export default PurchaseHero;
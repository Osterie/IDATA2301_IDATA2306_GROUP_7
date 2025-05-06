import React from "react";
import "./purchaseHero.css"; // Import the corresponding CSS file for styling

const PurchaseHero = ({ cartFlights }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target);

    // Extract form data
    const data = {
      fullName: formData.get("full-name"),
      email: formData.get("email"),
      cardNumber: formData.get("card-number"),
      expiryDate: formData.get("expiry-date"),
      cvv: formData.get("cvv"),
    };

    console.log("Form submitted:", data);
    print("Purchase completed successfully!"); 
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
          <div className="form-group">
            <label htmlFor="card-number">Card Number:</label>
            <input type="text" id="card-number" name="card-number" required />
          </div>
          <div className="form-group">
            <label htmlFor="expiry-date">Expiry Date:</label>
            <input
              type="text"
              id="expiry-date"
              name="expiry-date"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input type="password" id="cvv" name="cvv" required />
          </div>
          <button type="submit">Complete Purchase</button>
        </form>
      </div>
    </section>
  );
};

export default PurchaseHero;
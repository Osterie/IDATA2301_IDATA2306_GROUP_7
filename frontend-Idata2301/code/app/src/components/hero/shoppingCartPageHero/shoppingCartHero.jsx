import React, { useState, useEffect } from "react";
import { getShoppingCart, removeFromShoppingCart } from "../../../utils/shoppingCartUtils";
import "./shoppingCartHero.css";

const ShoppingCartHero = ({onNavClick}) => {
  const [cart, setCart] = useState([]);
  
  
  useEffect(() => {
    setCart(getShoppingCart());
  }, []);

  const handleRemoveFromCart = (flightId) => {
    const updatedCart = removeFromShoppingCart(flightId);
    setCart(updatedCart); 
  };

  const onPurchaseClick = () => {
    onNavClick("/purchase"); 
  };

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;
  };

  return (
    <section className="hero">
      <div className="shopping-cart-container">
        <h1>Shopping Cart</h1>

        {/* Shopping Cart */}
        <div className="cart">
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((flight) => {
                  const discountedPrice = calculateDiscountedPrice(flight.price, flight.discount);
                  return (
                    <li key={flight.id}>
                      <strong>{flight.flightClassId.flight.name}</strong> <br />
                      Departure: {flight.scheduledFlight.route.departureAirport.city} ({flight.scheduledFlight.route.departureAirport.airportCode}) <br />
                      Arrival: {flight.scheduledFlight.route.arrivalAirport.city} ({flight.scheduledFlight.route.arrivalAirport.airportCode}) <br />
                      Date: {flight.scheduledFlight.date} <br />
                      Available Seats: {flight.flightClassId.availableSeats} <br />
                      Price: {discountedPrice} {flight.currencyCode} {flight.discount > 0 && `(Discount: ${flight.discount}%)`}<br />
                    <button onClick={() => handleRemoveFromCart(flight.id)}>
                      Remove from Cart
                    </button>
                  </li>
                )})}
              </ul>
              <button
                className="purchase-button"
                onClick={onPurchaseClick}
                >
                Proceed to Purchase
              </button>
            </>
          ) : (
            <p>Your shopping cart is empty.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartHero;
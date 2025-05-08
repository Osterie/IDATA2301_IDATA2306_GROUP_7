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

  return (
    <section className="hero">
      <div className="shopping-cart-container">
        <h1>Shopping Cart</h1>

        {/* Shopping Cart */}
        <div className="cart">
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((flight) => (
                  <li key={flight.id}>
                    <strong>{flight.flightNumber}</strong> - {flight.airline} <br />
                    Departure: {flight.departure} | Arrival: {flight.arrival} <br />
                    Price: ${flight.price} <br />
                    <button onClick={() => handleRemoveFromCart(flight.id)}>
                      Remove from Cart
                    </button>
                  </li>
                ))}
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
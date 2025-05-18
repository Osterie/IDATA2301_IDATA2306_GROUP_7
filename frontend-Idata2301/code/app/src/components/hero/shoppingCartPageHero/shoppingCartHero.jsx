import React, { useState, useEffect } from "react";
import { getShoppingCart, removeFromShoppingCart, clearShoppingCart } from "../../../utils/shoppingCartUtils";
import { getCookie } from "../../../library/tools";
import { sendApiRequest } from "../../../library/requests";
import Cookies from "js-cookie";


import "./shoppingCartHero.css";

const ShoppingCartHero = ( {onNavClick} ) => {
  const [flights, setFlights] = useState([]);


  const userId = getCookie("current_user_id");

  
  useEffect(() => {
    const cartFromStorage = getShoppingCart();
    fetchFlights(cartFromStorage);
  }, []);
  
  const handleRemoveFromCart = async (flightId) => {
    removeFromShoppingCart(flightId);
    
    // Small delay ensures sync update completes (safety measure)
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    const updatedCart = getShoppingCart();
    console.log("Updated cart:", updatedCart);
    await fetchFlights(updatedCart);
  };
  

  const fetchFlights = async (cartIds = []) => {
    if (!Array.isArray(cartIds) || cartIds.length === 0) {
      setFlights([]);
      return;
    }
  
    await sendApiRequest(
      "POST",
      "/flights/getFlightByIds",
      (response) => {
        setFlights(response);
      },
      JSON.stringify(cartIds),
      (errorResponse) => {
        console.log("Error: " + errorResponse);
      }
    );
  };
  

  
  const [isPurchasing, setIsPurchasing] = useState(false);

const handlePurchase = async () => {
  setIsPurchasing(true);
  try {
    const data = flights.map((flight) => ({
      userId: userId,
      priceId: flight.id
    }));

    await sendApiRequest(
      "POST",
      "/purchaseFlights",
      (response) => {
        console.log("Purchase successful:", response);
        clearShoppingCart();
        setFlights([]);
      },
      JSON.stringify(data),
      (errorResponse) => {
        console.log("Error: " + errorResponse);
      }
    );
  } finally {
    setIsPurchasing(false);
  }
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
          {flights.length > 0 ? (
            <>
              <ul>
                {flights.map((flight) => {
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
              {flights.length > 0 && (
                <button
                  className="purchase-button"
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  >
                  {isPurchasing ? "Processing..." : "Purchase Now"}
              </button>

            )}
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
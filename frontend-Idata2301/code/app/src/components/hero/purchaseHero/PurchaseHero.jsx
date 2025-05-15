import React, { useEffect, useState } from "react";
import { getShoppingCart, clearShoppingCart } from "../../../utils/shoppingCartUtils";
import {sendApiRequest} from "../../../library/requests";

import "./purchaseHero.css";
import FlightCard from "../../cards/searched-flights/FlightCard.jsx";
import { use } from "react";
import { getCookie } from "../../../library/tools";

const PurchaseHero = ({ selectedFlight }) => {
  const [flightsToPurchase, setFlightsToPurchase] = useState([]);
  const [purchasing, setPurchasing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cart = getShoppingCart();

    if (
      selectedFlight &&
      !cart.some((f) => f.id === selectedFlight.id)
    ) {
      cart = [...cart, selectedFlight];
    }

    setFlightsToPurchase(cart);
  }, [selectedFlight]);

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;
  };

  const handlePurchase = async () => {
    setPurchasing(true);
    setError(null);

    const data = {
      flights: flightsToPurchase.map((flight) => ({
        userId: getCookie("userId"),
        price: flight.price
      })),
    };

    await sendApiRequest(
      "POST",
      "/purchaseFlights",
      (response) => {
        console.log("Purchase successful:", response);
        clearShoppingCart();
        setSuccess(true);
      },
      JSON.stringify(data),
      (errorResponse) => {
        console.log("Error: " + errorResponse);
        setError("Purchase failed. Please try again.");
      }
    );

    setPurchasing(false);
  };

  return (
    <section className="hero">
      <div className="purchase-container">
        <h1>Confirm Your Purchase</h1>

        <div className="flightsToPurchase">
        {success ? (
          <p className="success-message">Thank you for your purchase! 🎉</p>
        ) : (
          <>
            {flightsToPurchase.length === 0 ? (
              <p>No flights selected for purchase.</p>
            ) : (
              <ul>
                {flightsToPurchase.map((flight) => {
                  const discountedPrice = calculateDiscountedPrice(flight.price, flight.discount);
                  return (
                    <li key={flight.id}>
                      <strong>{flight.flightClassId.flight.name}</strong> <br />
                      Departure: {flight.scheduledFlight.route.departureAirport.city} ({flight.scheduledFlight.route.departureAirport.airportCode}) <br />
                      Arrival: {flight.scheduledFlight.route.arrivalAirport.city} ({flight.scheduledFlight.route.arrivalAirport.airportCode}) <br />
                      Date: {flight.scheduledFlight.date} <br />
                      Available Seats: {flight.flightClassId.availableSeats} <br />
                      Price: {discountedPrice} {flight.currencyCode} {flight.discount > 0 && `(Discount: ${flight.discount}%)`}<br />
                    </li>
                  );
                })}
              </ul>
            )}

            {error && <p className="error-message">{error}</p>}

            {flightsToPurchase.length > 0 && !success && (
              <button
                className="purchase-button"
                onClick={handlePurchase}
                disabled={purchasing}
              >
                {purchasing ? "Processing..." : "Confirm Purchase"}
              </button>
            )}
          </>
        )}
        </div>
      </div>
    </section>
  );
};





export default PurchaseHero;
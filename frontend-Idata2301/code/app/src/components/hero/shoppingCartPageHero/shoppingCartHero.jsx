import React, { useState, useEffect } from "react";
import { removeFromShoppingCart, clearShoppingCart, addToShoppingCart, getShoppingCartAsArray, deleteFromShoppingCart } from "../../../utils/shoppingCartUtils";
import FlightCard from "../../cards/searchedFlights/FlightCard.jsx";
import { getCookie } from "../../../library/tools";
import { sendApiRequest } from "../../../library/requests";
import { getPreferredCurrency } from "../../../utils/cookieUtils";
import { convertCurrency } from "../../../utils/currencyUtils";


import "./shoppingCartHero.css";

const ShoppingCartHero = ( {setActivePage, setSelectedFlight} ) => {
  const [flights, setFlights] = useState([]);
  const userId = getCookie("current_user_id");

  
  useEffect(() => {
    const cartFromStorage = getShoppingCartAsArray();
    console.log("Cart from storage:", cartFromStorage);
    fetchFlights(cartFromStorage);
  }, []);
  
  const handleRemoveFromCart = async (flightId) => {
    deleteFromShoppingCart(flightId);
    
    // Small delay ensures sync update completes (safety measure)
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    const updatedCart = getShoppingCartAsArray();
    console.log("Updated cart:", updatedCart);
    await fetchFlights(updatedCart);
  };
  

  const fetchFlights = async (cartIds = []) => {
  if (!Array.isArray(cartIds) || cartIds.length === 0) {
    setFlights([]);
    return;
  }

  // Count how many times each ID appears
  const idCountMap = cartIds.reduce((map, id) => {
    map[id] = (map[id] || 0) + 1;
    return map;
  }, {});

  const uniqueIds = Object.keys(idCountMap);
  console.log("Fetching flights for IDs:", uniqueIds);

  await sendApiRequest(
    "POST",
    "/flights/getFlightByIds",
    (response) => {
      const enriched = response.map((flight) => ({
        ...flight,
        quantity: idCountMap[flight.id] || 1,
      }));

      setFlights(enriched);
    },
    JSON.stringify(uniqueIds),
    (errorResponse) => {
      console.log("Error: " + errorResponse);
    }
  );
};


  const [isPurchasing, setIsPurchasing] = useState(false);

const handlePurchase = async () => {

  if (!userId) {
    setActivePage("login");
    return;
  }

  setIsPurchasing(true);
  try {
    const cartIds = getShoppingCartAsArray();
    const data = cartIds.map((flightId) => ({
      userId: userId,
      priceId: flightId
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

const incrementFlight = (flightId) => {
  addToShoppingCart(flightId);
  fetchFlights(getShoppingCartAsArray());
};

const decrementFlight = (flightId) => {
  removeFromShoppingCart(flightId);
  fetchFlights(getShoppingCartAsArray());
};

const setFlightQuantity = (flightId, quantity) => {
  // Clear all instances of that flight
  deleteFromShoppingCart(flightId);

  // Re-add flightId quantity times
  for (let i = 0; i < quantity; i++) {
    addToShoppingCart(flightId);
  }

  // Refresh cart
  fetchFlights(getShoppingCartAsArray());
};


const getTotalPrice = () => {
  return flights.reduce((sum, flight) => {
    const quantity = flight.quantity || 1;
    const convertedPrice = convertCurrency(flight.price, flight.currencyCode, getPreferredCurrency())
    const discountedPrice = calculateDiscountedPrice(convertedPrice, flight.discount);
    return sum + quantity * parseFloat(discountedPrice);
  }, 0).toFixed(2);
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
    return (

      <li key={flight.id} className="cart">
        {/* Flight Card on the left */}
        <FlightCard
          key={flight.id}
          flight={flight}
          setSelectedFlight = {setSelectedFlight}
          setActivePage={setActivePage}
          purchasable={false}
          actionButton={
            <button onClick={() => handleRemoveFromCart(flight.id)}>
              Remove
            </button>
          }
        />

        {/* Quantity controls on the right */}
        <div className="quantity-controls-wrapper">
          <button 
        onClick={() => incrementFlight(flight.id)}
        disabled={flight.quantity >= flight.flightClassId.availableSeats}
      >
        +
      </button>

          <input
            type="number"
            min="1"
            max={flight.flightClassId.availableSeats}
            value={flight.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value, 10);
              const maxSeats = flight.flightClassId.availableSeats;
              if (newQuantity > 0 && newQuantity <= maxSeats) {
                setFlightQuantity(flight.id, newQuantity);
              }
            }}
          />

          <button onClick={() => decrementFlight(flight.id)}>-</button>
        </div>
      </li>
    );
  })}
</ul>
<div className="total-price">
  <strong>Total:</strong> {getTotalPrice()} {getPreferredCurrency()}
</div>

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
import React, { useState, useEffect } from "react";
import { removeFromShoppingCart, clearShoppingCart, addToShoppingCart, getShoppingCartAsArray, deleteFromShoppingCart } from "../../../utils/shoppingCartUtils";
import FlightCard from "../../cards/searchedFlights/FlightCard.jsx";
import { getCookie } from "../../../library/tools";
import { sendApiRequest } from "../../../library/requests";
import { getPreferredCurrency } from "../../../utils/cookieUtils";
import { convertCurrency } from "../../../utils/currencyUtils";
import { calculateFinalPriceInUserCurrency } from "../../../utils/currencyUtils";


import "./shoppingCartHero.css";

const ShoppingCartHero = ({ setActivePage, setSelectedFlight, setFlights, flights }) => {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);


  const userId = getCookie("current_user_id");


  useEffect(() => {
    const cartFromStorage = getShoppingCartAsArray();
    fetchFlights(cartFromStorage);
  }, []);

  const handleRemoveFromCart = async (flightId) => {
    deleteFromShoppingCart(flightId);

    // Small delay ensures sync update completes (safety measure)
    await new Promise((resolve) => setTimeout(resolve, 0));

    const updatedCart = getShoppingCartAsArray();
    await fetchFlights(updatedCart);
  };


  const fetchFlights = async (cartIds = []) => {
    if (!Array.isArray(cartIds) || cartIds.length === 0) {
      setCart([]);
      return;
    }

    // Count how many times each ID appears
    const idCountMap = cartIds.reduce((map, id) => {
      map[id] = (map[id] || 0) + 1;
      return map;
    }, {});

    const uniqueIds = Object.keys(idCountMap);

    await sendApiRequest(
      "POST",
      "/flights/getFlightByIds",
      (response) => {
        const enriched = response.map((flight) => ({
          ...flight,
          quantity: idCountMap[flight.id] || 1,
        }));

        setCart(enriched);
      },
      JSON.stringify(uniqueIds),
      (errorResponse) => {
        console.error("Error: " + errorResponse);
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
          setFlights((prevFlights) =>
            prevFlights.map((flight) => {
              const cartItem = cart.find((item) => item.id === flight.id);
              if (cartItem) {
                return {
                  ...flight,
                  flightClassId: {
                    ...flight.flightClassId,
                    availableSeats: flight.flightClassId.availableSeats - cartItem.quantity,
                  },
                };
              }
              return flight;
            })
          );


          clearShoppingCart();
          setCart([]);
        },
        JSON.stringify(data),
        (errorResponse) => {
          console.error("Error: " + errorResponse);
        }
      );
    } finally {
      setShowPopup(true);

      setIsPurchasing(false);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);// 3 seconds

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
    return cart.reduce((sum, flight) => {
      const quantity = flight.quantity || 1;
      const discountedPrice = calculateFinalPriceInUserCurrency(flight.price, flight.discount, flight.currencyCode);
      return sum + quantity * parseFloat(discountedPrice);
    }, 0).toFixed(2);
  };

  return (
    <section className="shopping-hero">

      {showPopup && (
        <div className="cart-popup-message">
          Thank you for the purchase!
        </div>
      )}

      <div className="shopping-cart-container">
        <h1 className="shopping-cart-header">Shopping Cart</h1>

        {/* Shopping Cart */}
        <div className="cart-container">
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((flight) => {
                  return (

                    <li key={flight.id} className="cart-container">
                      {/* Flight Card on the left */}
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        setSelectedFlight={setSelectedFlight}
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
                          className="plus-button"
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
                          className="shopping-cart-input"
                        />

                        <button onClick={() => decrementFlight(flight.id)} className="minus-button">-</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="total-price">
                <strong>Total:</strong> {getTotalPrice()} {getPreferredCurrency()}
              </div>

              {cart.length > 0 && (
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
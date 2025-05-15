import React from "react";
import "./flightCard.css";
import { sendApiRequest } from "../../../library/requests";
import { addToShoppingCart } from "../../../utils/shoppingCartUtils";

const FlightCard = ({
  flight,
  userIsAdmin,
  onVisibilityChange,
  purchasable = true,
  purchaseDate,
  setSelectedFlight,
  setActivePage,
  isFavorite,
  onFavoriteToggle,
}) => {
  const {
    id,
    flightClassId: {
      flightClass: { name: flightClassName },
      flight: {
        name: flightName,
        company: { name: companyName, logoImageData },
      },
      availableSeats,
    },
    price,
    priceCode,
    isHidden,
    provider,
    discount,
    scheduledFlight: {
      date,
      route: {
        departureAirport: { airportCode: departureCode, city: departureCity },
        arrivalAirport: { airportCode: arrivalCode, city: arrivalCity },
      },
    },
  } = flight;

  const handleAddToCart = () => {
    addToShoppingCart(flight);
  };

  const handleToggleVisibility = async () => {
    const formData = {
      priceId: id,
      doHide: !isHidden,
    };

    await sendApiRequest(
      "POST",
      "/setFlightProductVisibility",
      (result) => {
        const updatedFlight = { ...flight, isHidden: !isHidden };
        if (typeof onVisibilityChange === "function") {
          onVisibilityChange(updatedFlight);
        }
      },
      JSON.stringify(formData),
      (errorResponse) => {
        console.log("Error: " + errorResponse);
      }
    );
  };

  return (
    <div className="flight-card">
      <div className="flight-card-header">
        {logoImageData && (
          <img
            src={`data:image/jpeg;base64,${logoImageData}`}
            alt={`${companyName} logo`}
            className="flight-card-company-logo"
          />
        )}
        <div className="flight-card-title">
          <h2>{companyName} - {flightName}</h2>
        </div>
      </div>

      <p className="flight-card-class-name">Class: {flightClassName}</p>

      <div className="flight-card-flight-details">
        <div className="flight-card-departure">
          <p className="flight-card-location-label">Departure</p>
          <p>{departureCity} ({departureCode})</p>
        </div>
        <div className="flight-card-arrival">
          <p className="flight-card-location-label">Arrival</p>
          <p>{arrivalCity} ({arrivalCode})</p>
        </div>
      </div>

      <p className="flight-card-date">Departure Date: {date}</p>

      {purchaseDate && (
        <p className="flight-card-purchase-date">
          Purchased on: {new Date(purchaseDate).toLocaleDateString()}
        </p>
      )}

      {purchasable && (
        <p className="flight-card-seats">Available Seats: {availableSeats}</p>
      )}

      <div className="flight-card-price-section">
        <p className="flight-card-price">${price} {priceCode}</p>
        {discount > 0 && (
          <p className="flight-card-discount">Discount: {discount}%</p>
        )}
      </div>

      <button
        className="flight-card-book-button"
        onClick={() => {
          if (setSelectedFlight && setActivePage) {
            setSelectedFlight(flight);
            setActivePage("flight-details");
          }
        }}
      >
        Details
      </button>

      {purchasable && (
        <button className="flight-card-book-button" onClick={handleAddToCart}>
          Add to cart
        </button>
      )}

      <button
        className="flight-card-book-button"
        onClick={() => onFavoriteToggle?.(flight.id, isFavorite)}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <p className="flight-card-provider">Provider: {provider}</p>

      {userIsAdmin && (
        <button
          className="flight-card-toggle-visibility-button"
          onClick={handleToggleVisibility}
        >
          {isHidden ? "Show" : "Hide"}
        </button>
      )}
    </div>
  );
};

export default FlightCard;

import React from "react";
import "./newFlightCard.css";
import { sendApiRequest } from "../../../library/requests";

const NewFlightCard = ({ flight, userIsAdmin, onVisibilityChange }) => {
  const {
    id,
    flightClassId: {
      flightClass: { name: flightClassName },
      flight: { name: flightName, company },
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
    <div className="new-flight-card">
      <h2>
        {company} - {flightName}
      </h2>
      <p className="new-class-name">Class: {flightClassName}</p>

      <div className="new-flight-details">
        <div className="new-departure">
          <p className="label">Departure</p>
          <p>
            {departureCity} ({departureCode})
          </p>
        </div>
        <div className="new-arrival">
          <p className="label">Arrival</p>
          <p>
            {arrivalCity} ({arrivalCode})
          </p>
        </div>
      </div>

      <p className="new-date">Date: {date}</p>
      <p className="new-seats">Available Seats: {availableSeats}</p>

      <div className="new-price-section">
        <p className="new-price">
          ${price} {priceCode}
        </p>
        {discount > 0 && <p className="new-discount">Discount: {discount}%</p>}
      </div>

      <button className="new-book-button">Details</button>
      <button className="new-book-button">Add to cart</button>

      <p className="new-provider">Provider: {provider}</p>

      {userIsAdmin && (
        <button
          className="toggle-visibility-button"
          onClick={handleToggleVisibility}
        >
          {isHidden ? "Show" : "Hide"}
        </button>
      )}
    </div>
  );
};

export default NewFlightCard;

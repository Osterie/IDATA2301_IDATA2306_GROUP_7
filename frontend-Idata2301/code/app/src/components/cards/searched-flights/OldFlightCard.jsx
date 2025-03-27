import React from "react";
import "./flightCard.css"; // Import the flight card styles

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <h2>{flight.airline}</h2>
      <p>{flight.flightNumber}</p>
      <div className="flight-details">
        <div>
          <p className="label">Departure</p>
          <p>{flight.departure}</p>
        </div>
        <div>
          <p className="label">Arrival</p>
          <p>{flight.arrival}</p>
        </div>
      </div>
      <p className="price">${flight.price}</p>
    </div>
  );
};

export default FlightCard;

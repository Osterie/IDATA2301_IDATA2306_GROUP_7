import React from "react";
import "./flightCard.css"; 

const NewFlightCard = ({ flight }) => {
  const {
    flightClassId: {
      flightClass: { name: flightClassName },
      flight: { name: flightName, company },
      availableSeats,
    },
    price,
    priceCode,
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

  return (
    <div className="new-flight-card">
      <h2>{company} - {flightName}</h2>
      <p className="new-class-name">Class: {flightClassName}</p>
      
      <div className="new-flight-details">
        <div className="new-departure">
          <p className="label">Departure</p>
          <p>{departureCity} ({departureCode})</p>
        </div>
        <div className="new-arrival">
          <p className="label">Arrival</p>
          <p>{arrivalCity} ({arrivalCode})</p>
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

      <p className="new-provider">Provider: {provider}</p>
    </div>
  );
};

export default NewFlightCard;

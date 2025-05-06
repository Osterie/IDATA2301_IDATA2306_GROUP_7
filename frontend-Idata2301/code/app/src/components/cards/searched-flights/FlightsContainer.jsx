import React from "react";
import NewFlightCard from "./FlightCard";
import "./flightsContainer.css"; 

const FlightsContainer = ({ flights }) => {  // Receive flights as a prop

  return (
    <div className="flights-container flights-grid">
      {flights.length > 0 ? (
        flights
          .filter(flight => !flight.isHidden)  // Filter out flights where isHidden is true
          .map((flight, index) => <NewFlightCard key={index} flight={flight} />)
      ) : (
        <p>No flights found fitting given criteria.</p>
      )}
    </div>
  );
};

export default FlightsContainer;

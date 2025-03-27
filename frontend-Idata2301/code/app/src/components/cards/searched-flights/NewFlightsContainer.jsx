import React from "react";
import NewFlightCard from "./NewFlightCard";
import "./flightsContainer.css"; 

const FlightsContainer = ({ flights }) => {  // Receive flights as a prop
  return (
    <div className="flights-container">
      {flights.length > 0 ? (
        flights.map((flight, index) => <NewFlightCard key={index} flight={flight} />)
      ) : (
        <p>No flights found fitting given criteria.</p>
      )}
    </div>
  );
};

export default FlightsContainer;

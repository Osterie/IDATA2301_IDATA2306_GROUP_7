import React, { useEffect, useState } from "react";
import NewFlightCard from "./FlightCard";
import "./flightsContainer.css";
import { isAdmin } from "../../../library/Identity/authentication";

const FlightsContainer = ({
  flights: initialFlights,
  user,
  setSelectedFlight, 
  setActivePage     
}) => {
  const userIsAdmin = user && isAdmin(user);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    setFlights(initialFlights);
  }, [initialFlights]);

  const handleVisibilityChange = (updatedFlight) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.id === updatedFlight.id ? updatedFlight : flight
      )
    );
  };

  return (
    <div className="flights-container flights-grid">
      {flights.length > 0 ? (
        flights
          .filter((flight) => !flight.isHidden || userIsAdmin)
          .map((flight) => (
            <NewFlightCard
              key={flight.id}
              flight={flight}
              userIsAdmin={userIsAdmin}
              onVisibilityChange={handleVisibilityChange}
              setSelectedFlight={setSelectedFlight}  
              setActivePage={setActivePage}          
            />
          ))
      ) : (
        <p>No flights found fitting given criteria.</p>
      )}
    </div>
  );
};

export default FlightsContainer;

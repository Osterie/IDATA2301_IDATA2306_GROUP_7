import React, { useState, useEffect } from "react";
import FlightCard from "./FlightCard";
import "./flightsContainer.css"; // Import the container styles

const FlightsContainer = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const fakeData = [
        {
          airline: "Delta Airlines",
          flightNumber: "DL123",
          departure: "New York (JFK)",
          arrival: "Los Angeles (LAX)",
          price: 320,
        },
        {
          airline: "American Airlines",
          flightNumber: "AA456",
          departure: "Chicago (ORD)",
          arrival: "Miami (MIA)",
          price: 280,
        },
        {
            airline: "American Airlines",
            flightNumber: "AA456",
            departure: "Chicago (ORD)",
            arrival: "Miami (MIA)",
            price: 280,
        },
        {
            airline: "American Airlines",
            flightNumber: "AA456",
            departure: "Chicago (ORD)",
            arrival: "Miami (MIA)",
            price: 280,
        },
      ];
      setFlights(fakeData);
    };

    fetchFlights();
  }, []);

  return (
    <div className="flights-container flights-grid">
      {flights.map((flight, index) => (
        <FlightCard key={index} flight={flight} />
      ))}
    </div>
  );
};

export default FlightsContainer;

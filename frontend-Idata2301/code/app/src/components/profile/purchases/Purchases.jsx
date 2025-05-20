import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./purchases.module.css";
import { sendApiRequest } from "../../../library/requests.js";
import FlightCard from "../../cards/searchedFlights/FlightCard.jsx";



const PurchasedFlights = ({user, setSelectedFlight, setActivePage}) => {

  let [flights, setFlights] = useState([]);

  // Function to fetch purchased flights from the backend
  const fetchPurchasedFlights = async () => {
    await sendApiRequest(
      "GET",
      `/purchases?userId=${user.id}`,
      (response) => {
        // Handle the response as needed
        if (response && response.length > 0) {
          console.log(response)
          setFlights(response);
        } else {
          console.log("No purchased flights found for this user.");
        }
      },
      null, // No request body for GET
      (error) => {
        console.error("Error fetching purchased flights:", error);
      }
    );
  };

  // Call the function to fetch purchased flights when the component mounts
  useEffect(() => {
    if (user){
      fetchPurchasedFlights();
    }
  }, []);

  return (
    <div>
      <h2>Purchased Flights</h2>
      <p>Here is a list of flights you have purchased.</p>
        
      <div className="flights-container flights-grid">
      {flights.length > 0 ? (
        flights
          .map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight.price}
              purchasable={false}
              purchaseDate ={flight.date}
              setSelectedFlight={setSelectedFlight} 
              setActivePage={setActivePage}
            />
          ))
      ) : (
        <p>No flights found.</p>
      )}
      </div>
    </div>

  );
};

export default PurchasedFlights;

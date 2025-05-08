import React from "react";
import styles from "./purchases.module.css";
import { sendApiRequest } from "../../../library/requests.js";


const PurchasedFlights = ({user}) => {

  // Function to fetch purchased flights from the backend
  const fetchPurchasedFlights = () => {
    sendApiRequest(
      "GET",
      `/purchases?userId=${user.id}`,
      (response) => {
        console.log("Purchased flights:", response);
        // Handle the response as needed
      },
      null, // No request body for GET
      (error) => {
        console.error("Error fetching purchased flights:", error);
      }
    );
  };


  return (
    <div className={styles.purchasedFlights}>
      <h2>Purchased Flights</h2>
      <p>Here is a list of flights you have purchased.</p>
    </div>
  );
};

export default PurchasedFlights;

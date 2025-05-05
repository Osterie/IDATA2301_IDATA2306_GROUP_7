import React from "react";
import styles from "./purchaces.module.css";

const PurchasedFlights = () => {
  return (
    <div className={styles.purchasedFlights}>
      <h2>Purchased Flights</h2>
      <p>Here is a list of flights you have purchased.</p>
    </div>
  );
};

export default PurchasedFlights;

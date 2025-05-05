import React from "react";
import styles from "./favoriteFlights.module.css";

const FavoriteFlights = () => {
  return (
    <div className={styles.favoriteFlights}>
      <h2>Favorite Flights</h2>
      <p>Here are the flights you've marked as favorites.</p>
    </div>
  );
};

export default FavoriteFlights;

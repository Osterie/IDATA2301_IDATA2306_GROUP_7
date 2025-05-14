import React, { useEffect, useState } from "react";
import styles from "./favoriteFlights.module.css";
import { fetchFavoriteFlights } from "../../../library/favoritesAPI.js"; // Import fetchFavoriteFlights

const FavoriteFlights = ({user}) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const userId = user.id;

  // Fetch the favorite flights from the API
  useEffect(() => {
    // Use fetchFavoriteFlights function from favoritesAPI.js
    fetchFavoriteFlights(userId, 
      (response) => {
        setFavorites(response); // Handle successful response
      },
      (errorMessage) => {
        setError(errorMessage); // Handle error response
      }
    );
  }, [userId]);

  return (
    <div className={styles.favoriteFlights}>
      <h2>Favorite Flights</h2>
      <p>Here are the flights you've marked as favorites.</p>

      {error && <p className="error">{error}</p>}

      <div className={styles.flightList}>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite.id} className={styles.flightItem}>
              <h3>{favorite.price.scheduledFlight.flightName}</h3>
              <p>Price: {favorite.price.price} {favorite.price.currencyCode}</p>
              <p>Class: {favorite.price.flightClassId.className}</p>
            </div>
          ))
        ) : (
          <p>No favorite flights found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteFlights;

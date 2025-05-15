import React, { useEffect, useState } from "react";
import styles from "./favoriteFlights.module.css";
import { fetchFavoriteFlights } from "../../../library/favoritesAPI.js";
import FlightCard from "../../cards/searched-flights/FlightCard.jsx";

const FavoriteFlights = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const userId = user.id;

  useEffect(() => {
    fetchFavoriteFlights(
      userId,
      (response) => {
        setFavorites(response);
      },
      (errorMessage) => {
        setError(errorMessage);
      }
    );
  }, [userId]);

  const handleFavoriteToggle = (flightId, currentlyFavorite) => {
    // TODO: Implement removing from favorites
  };

  return (
    <div className={styles.favoriteFlights}>
      <h2>Favorite Flights</h2>
      <p>Here are the flights you've marked as favorites.</p>

      {error && <p className="error">{error}</p>}

      <div className={styles.flightList}>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <FlightCard
              key={favorite.id}
              flight={favorite.price}
              userIsAdmin={false}
              purchasable={false}
              isFavorite={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        ) : (
          <p>No favorite flights found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteFlights;

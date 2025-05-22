import React, { useEffect, useState } from "react";
import styles from "./favoriteFlights.module.css";
import { fetchFavoriteFlights, removeFavoriteFlight, addFavoriteFlight } from "../../../library/favoritesAPI.js";
import FlightCard from "../../cards/searchedFlights/FlightCard.jsx";

const FavoriteFlights = ({ user, setSelectedFlight, setActivePage }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const userId = user.id;

  // Fetches the favorit flights
  const fetchFavorites = () => {
    fetchFavoriteFlights(
      userId,
      (response) => setFavorites(response),
      (errorMessage) => setError(errorMessage)
    );
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  // Handles the toggle favorit button
  const handleFavoriteToggle = (flightId, currentlyFavorite) => {
    if (!userId) return;

    const callback = () => {
      fetchFavorites(); // Refetch favorites after toggle completes
    };

    if (currentlyFavorite) {
      removeFavoriteFlight(userId, flightId, callback);
    } else {
      addFavoriteFlight(userId, flightId, callback);
    }
  };

  return (
    <div className={styles["favorite-flights"]}>
      <h2>Favorite Flights</h2>
      <p>Here are the flights you've marked as favorites.</p>

      {error && <p className="error">{error}</p>}

      <div className={styles["flight-list"]}>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <FlightCard
              key={favorite.id}
              flight={favorite.price}
              userIsAdmin={false}
              purchasable={false}
              isFavorite={true}
              setSelectedFlight={setSelectedFlight}
              setActivePage={setActivePage}
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

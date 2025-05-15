import React, { useEffect, useState } from "react";
import FlightCard from "./FlightCard";
import "./flightsContainer.css";
import { isAdmin } from "../../../library/Identity/authentication";
import {
  fetchFavoriteFlights,
  addFavoriteFlight,
  removeFavoriteFlight,
} from "../../../library/favoritesAPI";

const FlightsContainer = ({
  flights: initialFlights,
  user,
  setSelectedFlight,
  setActivePage,
}) => {
  const userIsAdmin = user && isAdmin(user);
  const [flights, setFlights] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Load initial flights
  useEffect(() => {
    setFlights(initialFlights);
  }, [initialFlights]);

  // Load favorite flight IDs for this user
  useEffect(() => {
    if (user?.id) {
      fetchFavoriteFlights(
        user.id,
        (data) => {
          const ids = data.map((fav) => fav.price.id); // Ensure this maps correctly
          setFavoriteIds(ids);
        },
        (err) => {
          console.error("Failed to fetch favorites", err);
        }
      );
    }
  }, [user]);

  const handleVisibilityChange = (updatedFlight) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.id === updatedFlight.id ? updatedFlight : flight
      )
    );
  };

  const handleFavoriteToggle = (flightId, currentlyFavorite) => {
    if (!user?.id) return;

    const updateFavorites = () => {
      setFavoriteIds((prev) =>
        currentlyFavorite
          ? prev.filter((id) => id !== flightId)
          : [...prev, flightId]
      );
    };

    if (currentlyFavorite) {
      removeFavoriteFlight(user.id, flightId, updateFavorites);
    } else {
      addFavoriteFlight(user.id, flightId, updateFavorites);
    }
  };

  return (
    <section className="flights-section">
      {flights.length > 0 ? (
        flights
          .filter(
            (flight) =>
              !flight.isFilteredOut &&
              (flight.isHidden ? userIsAdmin : true)
          )
          .map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              userIsAdmin={userIsAdmin}
              onVisibilityChange={handleVisibilityChange}
              setSelectedFlight={setSelectedFlight}
              setActivePage={setActivePage}
              isFavorite={favoriteIds.includes(flight.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
      ) : (
        <p>No flights found fitting given criteria.</p>
      )}
    </section>
  );
};

export default FlightsContainer;

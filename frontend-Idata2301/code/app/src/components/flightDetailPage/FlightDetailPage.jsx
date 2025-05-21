import React, { useEffect, useState } from "react";
import "./flightDetailPage.css";
import FlightDetailPageCard from "./FlightDetailPageCard";
import { getCompanyImage } from "../../library/imageRequests";
import { sendApiRequest } from "../../library/requests";
import flightHeroImage from "../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg";
import { getFlightAccommodations } from "../../library/accommodations";
import {
  fetchFavoriteFlights,
  addFavoriteFlight,
  removeFavoriteFlight,
} from "../../library/favoritesAPI";

const FlightDetailPage = ({
  searchParams,
  flight,
  user,
  setActivePage,
  handleGoBack,
}) => {
  const [providerAlternatives, setProviderAlternatives] = useState([]);
  const [flightAccommodations, setFlightAccommodations] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);


  const companyImageUrl = flight.scheduledFlight.flight.company.imageUrl;

  // Fetch provider alternatives
  useEffect(() => {
    const getProviderAlternatives = async () => {
      try {
        const finalSearchParams = {
          ...searchParams,
          fromDate: flight?.scheduledFlight?.date,
          toDate: flight?.scheduledFlight?.date,
        };

        await sendApiRequest(
          "POST",
          "/searchForFlights",
          (fetchedData) => {
            const filteredData = fetchedData.filter(
              (newflight) => newflight.id !== flight.id
            );
            setProviderAlternatives(filteredData);
          },
          JSON.stringify(finalSearchParams),
          (errorResponse) => {
            console.error("Error: " + errorResponse);
          }
        );
      } catch (error) {
        console.error("Error searching for flights:", error);
      }
    };

    if (flight) {
      getProviderAlternatives();
    }
  }, [flight, searchParams]);

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

  const doGetFlightAccommodations = async (flight) => {
    if (flight && flight.scheduledFlight.flight.id) {
      await getFlightAccommodations(flight.scheduledFlight.flight.id, function (response) {
        console.info("Flight accommodations fetched successfully:", response);
        setFlightAccommodations(response); // Save to state
      });
    }
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

  useEffect(() => {
    doGetFlightAccommodations(flight);
  }, [flight]);

  return (
    <section>
      <header className="flight-hero-image">
        <button onClick={handleGoBack} className="back-button">
          ← Go Back
        </button>
        <img
          src={companyImageUrl || flightHeroImage}
          alt="Company or default flight image"
        />
      </header>

      <FlightDetailPageCard flight={flight} accommodations={flightAccommodations} 
        isFavorite={favoriteIds.includes(flight.id)} onFavoriteToggle={handleFavoriteToggle}/>

      <article className="provider-alternative-parent">
        <h1>Provider alternatives</h1>
        <div className="provider-alternative-vertical-scroll">
          {providerAlternatives.map((flight) => (

            <div className="provider-alternative-item" key={flight.id}>
              <FlightDetailPageCard key={flight.id} flight={flight} isFavorite={favoriteIds.includes(flight.id)}
              onFavoriteToggle={handleFavoriteToggle}/>
            </div>

          ))}
        </div>
      </article>
    </section>
  );
};

export default FlightDetailPage;

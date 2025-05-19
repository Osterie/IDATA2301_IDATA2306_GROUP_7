import React from "react";
import { useEffect, useState } from "react";
import { sendApiRequest } from "../../library/requests";
import "./flightDetailPage.css";
import FlightDetailPageCard from "./FlightDetailPageCard";
import flightHeroImage from "../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg";

const FlightDetailPage = ({ searchParams, flight, onAddToCart, onBuyNow }) => {
  const [providerAlternatives, setProviderAlternatives] = useState([]);

  const getProviderAlternatives = async () => {
    try {
      let finalSearchParams = searchParams;

      finalSearchParams.fromDate = flight.scheduledFlight.date;
      finalSearchParams.toDate = flight.scheduledFlight.date;

      await sendApiRequest(
        "POST",
        "/searchForFlights",
        function (fetchedData) {
          const filteredData = fetchedData.filter(
            (newflight) => newflight.id !== flight.id
          );
          setProviderAlternatives(filteredData);
        },
        JSON.stringify(finalSearchParams),
        function (errorResponse) {
          console.log("Error: " + errorResponse);
          throw new Error("Network response was not ok");
        }
      );
    } catch (error) {
      console.error("Error searching for flights:", error);
    }
  };

  useEffect(() => {
    getProviderAlternatives();
  }, [flight]);

  return (
    <section>
      <header className="flight-hero-image">
        <img src={flightHeroImage} alt="Scenic airplane flight" />
      </header>

      <FlightDetailPageCard
        flight={flight}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <article className="provider-alternative-parent">
        <h1>Provider alternatives</h1>

        <div className="provider-alternative-container">
          {providerAlternatives.map((flight) => (
            <FlightDetailPageCard
              key={flight.id}
              flight={flight}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </article>
    </section>
  );
};

export default FlightDetailPage;

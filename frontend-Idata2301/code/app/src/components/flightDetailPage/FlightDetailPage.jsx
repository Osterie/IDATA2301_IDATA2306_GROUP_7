import React, { useEffect, useState } from "react";
import "./flightDetailPage.css";
import FlightDetailPageCard from "./FlightDetailPageCard";
import { getCompanyImage } from "../../library/imageRequests";
import { sendApiRequest } from "../../library/requests";
import flightHeroImage from "../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg";

const FlightDetailPage = ({ searchParams, flight, setActivePage}) => {
  const [providerAlternatives, setProviderAlternatives] = useState([]);

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

  return (
    <section>
      <header className="flight-hero-image">
        <button onClick={() => setActivePage("deals")} className="back-button">← Back to admin page</button>
        <img
          src={companyImageUrl || flightHeroImage}
          alt="Company or default flight image"
        />
      </header>

      <FlightDetailPageCard
        flight={flight}
      />

      <article className="provider-alternative-parent">
        <h1>Provider alternatives</h1>
        <div className="provider-alternative-container">
          {providerAlternatives.map((flight) => (
            <FlightDetailPageCard
              key={flight.id}
              flight={flight}
            />
          ))}
        </div>
      </article>
    </section>
  );
};

export default FlightDetailPage;

import React, { useEffect, useState } from "react";
import "./flightDetailPage.css";
import FlightDetailPageCard from "./FlightDetailPageCard";
import { getCompanyImage } from "../../library/imageRequests";
import { sendApiRequest } from "../../library/requests";
import flightHeroImage from "../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg";

const FlightDetailPage = ({ searchParams, flight, onAddToCart, onBuyNow }) => {
  const [companyImageUrl, setCompanyImageUrl] = useState(null);
  const [providerAlternatives, setProviderAlternatives] = useState([]);

  // Fetch company image
  useEffect(() => {
    const companyId = flight?.flightClassId?.flight?.company?.id;

    if (companyId) {
      getCompanyImage(companyId)
        .then((imageBlob) => {
          if (imageBlob instanceof Blob) {
            const imageUrl = URL.createObjectURL(imageBlob);
            setCompanyImageUrl(imageUrl);
          } else {
            console.warn("Fetched image is not a valid Blob:", imageBlob);
            setCompanyImageUrl(null);
          }
        })
        .catch((error) => {
          console.error("Error loading company image:", error);
          setCompanyImageUrl(null);
        });
    } else {
      console.warn("No company ID available to fetch image.");
    }
  }, [flight]);

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
        <img
          src={companyImageUrl || flightHeroImage}
          alt="Company or default flight image"
        />
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

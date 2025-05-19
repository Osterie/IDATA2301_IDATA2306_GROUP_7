import React, { useEffect, useState } from "react";
import "./flightDetailPage.css";
import FlightDetailPageCard from "./FlightDetailPageCard";
import { getCompanyImage } from "../../library/imageRequests";
import flightHeroImage from "../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg";

const FlightDetailPage = ({ flight, onAddToCart, onBuyNow }) => {
  const [companyImageUrl, setCompanyImageUrl] = useState(null);

  useEffect(() => {
    const companyId = flight?.flightClassId?.flight?.company?.id;

    if (companyId) {
      getCompanyImage(companyId)
        .then((imageBlob) => {
          console.log("Fetched image blob:", 
            // imageBlob
          );

          if (imageBlob && imageBlob instanceof Blob) {
            const imageUrl = URL.createObjectURL(imageBlob);
            console.log("Generated image URL:", 
              // imageUrl
            );
            setCompanyImageUrl(imageUrl);
          } else {
            console.warn("Fetched image is not a valid Blob:", 
              // imageBlob
            );
            setCompanyImageUrl(null);
          }
        })
        .catch((error) => {
          console.error("Error loading company image:", 
            // error
          );
          setCompanyImageUrl(null);
        });
    } else {
      console.warn("No company ID available to fetch image.");
    }
  }, [flight]);



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
      </article>
    </section>
  );
};

export default FlightDetailPage;

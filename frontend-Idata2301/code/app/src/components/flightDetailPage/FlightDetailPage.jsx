import React from "react";
import "./flightDetailPage.css";
import FlightDetailPageCard from "./FlightDetailPageCard";
import flightHeroImage from "../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg";

const FlightDetailPage = ({ flight, onAddToCart, onBuyNow }) => {
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
      </article>
    </section>
  );
};

export default FlightDetailPage;

import React from "react";
import "./flightDetailPage.css";
import { addToShoppingCart } from "../../utils/shoppingCartUtils";
import flightHeroImage from "../../resources/images/avel-chuklanov-Ou1eqo29Ums-unsplash.jpg";

const FlightDetailPage = ({ flight, onAddToCart, onBuyNow }) => {
  const {
    flightClassId: {
      flightClass: { name: flightClassName },
      flight: { name: flightName, company },
      availableSeats,
    },
    price,
    priceCode,
    provider,
    discount,
    scheduledFlight: {
      date,
      route: {
        departureAirport: { airportCode: departureCode, city: departureCity },
        arrivalAirport: { airportCode: arrivalCode, city: arrivalCity },
      },
    },
  } = flight;

  const handleAddToCart = () => {
    addToShoppingCart(flight);
  };

  return (
    <main>
      <header className="flight-hero-image">
        <img src={flightHeroImage} alt="Scenic airplane flight" />
      </header>

      <article className="flight-detail-page">
        <header className="flight-info-header">
          {company?.logoImageData && (
            <img
              src={`data:image/jpeg;base64,${company.logoImageData}`}
              alt={`${company.name} logo`}
              className="company-logo"
            />
          )}
          <h1>{company?.name ?? "Unknown Company"} – {flightName}</h1>
        </header>

        <section className="class-name">
          <p>Flight Class: <strong>{flightClassName}</strong></p>
        </section>

        <section className="flight-route">
          <div>
            <h2>Departure</h2>
            <p>{departureCity} ({departureCode})</p>
          </div>
          <div>
            <h2>Arrival</h2>
            <p>{arrivalCity} ({arrivalCode})</p>
          </div>
        </section>

        <section className="flight-date">
          <p>Date: <strong>{date}</strong></p>
        </section>

        <section className="seats-info">
          <p>Available Seats: <strong>{availableSeats}</strong></p>
        </section>

        <section className="pricing-info">
          <p className="price">Price: <strong>${price} {priceCode}</strong></p>
          {discount > 0 && (
            <p className="discount">Discount: <strong>{discount}% off</strong></p>
          )}
          <p className="provider">Provider: <strong>{provider}</strong></p>
        </section>

        <footer className="action-buttons">
          <button className="btn add-to-cart" onClick={handleAddToCart}>Add to cart</button>
          <button className="btn buy-now" onClick={() => onBuyNow(flight)}>Buy Now</button>
        </footer>
      </article>

      <article className="provider-alternative-parent">
          <h1>
            Provider alternatives
          </h1>
      </article>
    </main>
  );
};

export default FlightDetailPage;

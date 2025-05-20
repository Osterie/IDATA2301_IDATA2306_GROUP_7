import React from "react";
import "./flightDetailPage.css";
import { getPreferredCurrency } from "../../utils/cookieUtils";
import { convertCurrency } from "../../utils/currencyUtils";

const FlightDetailPageCard = ({ flight, onAddToCart, onBuyNow }) => {
  const {
    flightClassId: {
      flightClass: { name: flightClassName },
      flight: { name: flightName, company },
      availableSeats,
    },
    price,
    currencyCode,
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
    if (onAddToCart) {
      onAddToCart(flight);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? (price - (price * discount) / 100).toFixed(0) : price;
  };

  const discountedPrice = calculateDiscountedPrice(price, discount);

  return (
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


      <div className="flight-card-price-section">
        {discount > 0 ? (
          <>
            <p
              className="flight-card-original-price"
              style={{ textDecoration: "line-through", color: "#888", margin: 0 }}
            >
             {convertCurrency(price, currencyCode, getPreferredCurrency())} {getPreferredCurrency()}
            </p>
            <p className="flight-card-price" style={{ fontWeight: "bold", color: "#d32f2f" }}>
             Price: {convertCurrency(discountedPrice, currencyCode, getPreferredCurrency())} {getPreferredCurrency()}
            </p>
            <p className="flight-card-discount">Discount: {discount}%</p>
          </>
        ) : (
          <p className="flight-card-price">
            {convertCurrency(discountedPrice, currencyCode, getPreferredCurrency())} {getPreferredCurrency()}
          </p>
        )}
      </div>

      <footer className="action-buttons">
        <button className="btn add-to-cart" onClick={handleAddToCart}>Add to cart</button>
        <button className="btn buy-now" onClick={() => onBuyNow(flight)}>Buy Now</button>
      </footer>
    </article>
  );
};

export default FlightDetailPageCard;

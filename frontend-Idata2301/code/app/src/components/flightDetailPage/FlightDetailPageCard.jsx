import React from "react";
import "./flightDetailPage.css";
import { getPreferredCurrency } from "../../utils/cookieUtils";
import { addToShoppingCart } from "../../utils/shoppingCartUtils";
import { calculateFinalPriceInUserCurrency } from "../../utils/currencyUtils";

const FlightDetailPageCard = ({ flight, accommodations = [] }) => {
  const {
    id,
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
  const [showPopup, setShowPopup] = React.useState(false);
  const handleAddToCart = () => {
    setShowPopup(true);
    addToShoppingCart(id);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);// 3 seconds
  };
  
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

      {/* ✅ Flight Accommodations go here */}
      {accommodations.length > 0 && (
        <section className="accommodations-section">
          <h3>Flight Features</h3>
          <ul className="accommodation-list">
            {accommodations.map((item) => (
              <li key={item.feature.id} className="accommodation-item">
                {item.feature.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flight-card-price-section">
        {discount > 0 ? (
          <>
            <p
              className="flight-card-original-price"
              style={{ textDecoration: "line-through", color: "#888", margin: 0 }}
            >
              {calculateFinalPriceInUserCurrency(price, 0, currencyCode)} {getPreferredCurrency()}
            </p>
            <p className="flight-card-price" style={{ fontWeight: "bold", color: "#d32f2f" }}>
              Price: {calculateFinalPriceInUserCurrency(price, discount, currencyCode)} {getPreferredCurrency()}
            </p>
            <p className="flight-card-discount">Discount: {discount}%</p>
          </>
        ) : (
          <p className="flight-card-price">
            {calculateFinalPriceInUserCurrency(price, discount, currencyCode)} {getPreferredCurrency()}
          </p>
        )}
      </div>

      <p className="flight-card-provider">Provider: {provider}</p>

      <footer className="action-buttons">
        <button className="btn add-to-cart" onClick={handleAddToCart}>Add to cart</button>
        <div> {showPopup && ( <div className="detail-popup-message"> ✅ Added to cart! </div> )} </div>
      </footer>
    </article>
  );
};

export default FlightDetailPageCard;

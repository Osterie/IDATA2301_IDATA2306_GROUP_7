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
    const result = addToShoppingCart(flight);
  };

  return (
    <div>
      <div className="flight-hero-image">
        <img src={flightHeroImage} alt="Flight" />
      </div>
      <div className="flight-detail-page">
    
        <h1>{company} - {flightName}</h1>
        <p className="class-name">Flight Class: <strong>{flightClassName}</strong></p>

        <div className="flight-route">
          <div>
            <h3>Departure</h3>
            <p>{departureCity} ({departureCode})</p>
          </div>
          <div>
            <h3>Arrival</h3>
            <p>{arrivalCity} ({arrivalCode})</p>
          </div>
        </div>

        <p className="flight-date">Date: <strong>{date}</strong></p>
        <p className="seats-info">Available Seats: <strong>{availableSeats}</strong></p>

        <div className="pricing-info">
          <p className="price">
            Price: <strong>${price} {priceCode}</strong>
          </p>
          {discount > 0 && (
            <p className="discount">Discount: <strong>{discount}% off</strong></p>
          )}
          <p className="provider">Provider: <strong>{provider}</strong></p>
        </div>

        <div className="action-buttons">
          <button className="btn add-to-cart" onClick={handleAddToCart}>Add to cart</button>
          <button className="btn buy-now" onClick={() => onBuyNow(flight)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailPage;

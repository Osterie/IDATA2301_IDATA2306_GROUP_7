import { useState } from "react";
import "./flightCard.css";
import { updateFlightVisibility } from "../../../library/flightAPI";
import { addToShoppingCart, getFlightInCartCount } from "../../../utils/shoppingCartUtils";
import favActivePicture from "../../../resources/images/favactive.png";
import favInactivePicture from "../../../resources/images/favinactive.png";
import { getPreferredCurrency } from "../../../utils/cookieUtils";
import { calculateFinalPriceInUserCurrency } from "../../../utils/currencyUtils";

const FlightCard = ({
  flight,
  userIsAdmin = false,
  onVisibilityChange = null,
  purchasable = true,
  purchaseDate = null,
  setSelectedFlight = null,
  setActivePage = null,
  isFavorite,
  onFavoriteToggle = null,
  actionButton = null,
}) => {
  const {
    id,
    flightClassId: {
      flightClass: { name: flightClassName },
      flight: {
        name: flightName,
        company: { name: companyName, logoImageData },
      },
      availableSeats,
    },
    price,
    currencyCode,
    isHidden,
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

  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  //Handles the addition of a flight to the shopping cart
  // Checks if the flight is available and shows a popup message
  const handleAddToCart = () => {
    const inCart = getFlightInCartCount(id);
    
    if (availableSeats - inCart <= 0) {
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);// 3 seconds
      return;
    }
    setShowPopup(true);
    addToShoppingCart(id);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);// 3 seconds
  };

  // Toggles the visibility of the flight
  const handleToggleVisibility = async () => {
    const formData = {
      priceId: id,
      doHide: !isHidden,
    };

    await updateFlightVisibility(flight, isHidden, onVisibilityChange, formData);
  };

  return (
    <div className="flight-card">
      <div className="flight-card-header">
        {logoImageData && (
          <img
            src={`data:image/jpeg;base64,${logoImageData}`}
            alt={`${companyName} logo`}
            className="flight-card-company-logo"
          />
        )}
        <div className="flight-card-title">
          <h2>
            {companyName} - <abbr>{flightName}</abbr>
          </h2>
        </div>
      </div>

      <p className="flight-card-class-name">Class: {flightClassName}</p>

      <div className="flight-card-flight-details">
        <div className="flight-card-departure">
          <p className="flight-card-location-label">Departure</p>
          <p>
            {departureCity} ({departureCode})
          </p>
        </div>
        <div className="flight-card-arrival">
          <p className="flight-card-location-label">Arrival</p>
          <p>
            {arrivalCity} ({arrivalCode})
          </p>
        </div>
      </div>

      <p className="flight-card-date">Departure Date: {date}</p>

      {purchaseDate && (
        <p className="flight-card-purchase-date">
          Purchased on: {new Date(purchaseDate).toISOString().slice(0, 10)}
        </p>
      )}

      {purchasable && (
        <p className="flight-card-seats">Available Seats: {availableSeats}</p>
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
              {calculateFinalPriceInUserCurrency(price, discount, currencyCode)} {getPreferredCurrency()}
            </p>
            <p className="flight-card-discount">Discount: {discount}%</p>
          </>
        ) : (
          <p className="flight-card-price">
            {calculateFinalPriceInUserCurrency(price, discount, currencyCode)} {getPreferredCurrency()}
          </p>
        )}
      </div>


      <button
        className="flight-detail-button"
        onClick={() => {
          if (setSelectedFlight && setActivePage) {
            setSelectedFlight(flight);
            setActivePage("flight-details");
          }
        }}
      >
        Details
      </button>
      {onFavoriteToggle && (
        <div
          className={`flight-card-favorite-button ${isFavorite ? "favorited" : ""
            }`}
          onClick={() => onFavoriteToggle?.(flight.id, isFavorite)}
        >
          <div className="favorite-content">
            <img
              src={isFavorite ? favActivePicture : favInactivePicture}
              alt={isFavorite ? "Flight is favorited" : "Flight is not favorited"}
              className="favorite-icon"
            />

          </div>
        </div>
      )}
      {actionButton && (
        <button
          className="flight-card-actions-button"
          onClick={actionButton.props.onClick}
        >
          {actionButton.props.children}
        </button>
      )}

      {purchasable && (


        <button className="flight-cart-button" onClick={handleAddToCart}>
          Add to cart
        </button>
      )}

      <div>
            
        <div>
          {showPopup && (
            <div className="flight-popup-message">
              Added to cart!
            </div>
          )}


          {showErrorPopup && (
            <div className="flight-popup-message">
              No flight avaliable!
            </div>
          )}
        </div>
      </div>

      <p className="flight-card-provider">Provider: {provider}</p>

      {userIsAdmin && (
        <button
          className="flight-card-toggle-visibility-button"
          onClick={handleToggleVisibility}
        >
          {isHidden ? "Show" : "Hide"}
        </button>
      )}
    </div>
  );
};

export default FlightCard;

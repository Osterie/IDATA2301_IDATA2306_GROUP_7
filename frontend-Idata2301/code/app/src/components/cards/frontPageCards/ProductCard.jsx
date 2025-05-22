import "./productCard.css";
import { getPreferredCurrency } from "../../../utils/cookieUtils";
import { calculateFinalPriceInUserCurrency } from "../../../utils/currencyUtils";

const ProductCard = ({
  flight,
  title,
  description,
  highlighted,
  setSelectedFlight,
  setActivePage,
}) => {

  const img = flight.scheduledFlight.flight.company.imageUrl;

  const handleCardClick = () => {
    setSelectedFlight(flight);
    setActivePage("flight-details");
  };

  return (
    <article
      className={`card ${highlighted ? "highlighted" : ""}`}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      tabIndex={0}
      role="button"
      aria-label={`View flight: ${description}`}
    >
      <figure>

        <img className="product-card-img" src={img} alt={title || "Flight preview"} />        <figcaption className="card-description">
          <h2>{flight.description}</h2>
          <p>{flight.scheduledFlight.route.departureAirport.city} - {flight.scheduledFlight.route.arrivalAirport.city}</p>
          {flight.discount > 0 ? (
            <>
              <p
                style={{ textDecoration: "line-through", color: "#888", margin: 0 }}
              >
                {calculateFinalPriceInUserCurrency(flight.price, 0, flight.currencyCode)} {getPreferredCurrency()}
              </p>
              <p style={{ fontWeight: "bold", color: "#d32f2f" }}>
                {calculateFinalPriceInUserCurrency(flight.price, flight.discount, flight.currencyCode)} {getPreferredCurrency()}
              </p>
              <p>Discount: {flight.discount}%</p>
            </>
          ) : (
            <p style={{ fontWeight: "bold", color: "#d32f2f" }}>
              {calculateFinalPriceInUserCurrency(flight.price, flight.discount, flight.currencyCode)} {getPreferredCurrency()}
            </p>
          )}
          <p>{flight.date}</p>
        </figcaption>
      </figure>
    </article>
  );
};

export default ProductCard;

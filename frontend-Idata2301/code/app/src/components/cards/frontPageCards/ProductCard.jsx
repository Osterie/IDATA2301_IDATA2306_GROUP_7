import React from "react";
import "./productCard.css";

const ProductCard = ({
  flight,
  title,
  description,
  img,
  highlighted,
  price,
  currencyCode,
  date,
  setFlight,
  setActivePage,
}) => {
  const handleCardClick = () => {
    if (setFlight && setActivePage) {
      setFlight(flight);
      setActivePage("flight-details");
    }
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
        <img src={img} alt={title || "Flight preview"} />
        <figcaption className="card-description">
          <h2>{description}</h2>
          <p>
            Price: <strong>{price} {currencyCode}</strong>
          </p>
          <p>{date}</p>
        </figcaption>
      </figure>
    </article>
  );
};

export default ProductCard;

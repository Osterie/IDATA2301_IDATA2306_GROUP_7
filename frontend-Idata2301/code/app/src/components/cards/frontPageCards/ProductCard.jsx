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
  setActivePage     
}) => {



  const handleCardClick = () => {
    
    if (setFlight && setActivePage) {
      setFlight(flight);
      setActivePage("flight-details");
    }
  };

  return (
    <div
      className={`card ${highlighted ? "highlighted" : ""}`}
      onClick={handleCardClick} 
      style={{ cursor: "pointer" }} 
    >
      <img src={img} alt={title} />
      <div className="card-description">
        <h2>{description}</h2>
        <p>
          Price: <strong>{price} {currencyCode}</strong>
        </p>
        <p > {date} </p>
      </div>
    </div>
  );
};

export default ProductCard;
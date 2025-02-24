import React from "react";
import "./productCard.css";

const ProductCard = ({ title, description, img, highlighted }) => {
  return (
    <div className={`card ${highlighted ? "highlighted" : ""}`}>
      <img src={img} alt={title} />
      <div className="card-description">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;

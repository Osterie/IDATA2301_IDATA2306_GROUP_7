import { useState } from "react";
import "./customInputField.css";

const CustomInputField = ({ amount, onAmountChange }) => {

  // Adds value
  const addValue = () => {
    onAmountChange(amount + 1);
  };

  // Subracts value
  const subtractValue = () => {
    onAmountChange(Math.max(0, amount - 1));
  };

  // Handles a change to the page
  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      onAmountChange("");
      return;
    }

    const number = parseInt(value, 10);
    if (!isNaN(number) && number >= 0) {
      onAmountChange(number);
    }
  };

  return (
    <div className="input-number">
      <input
        type="number"
        value={amount}
        onChange={handleChange}
        min={0}
      />
      <div className="input-number-actions">
        <button
          type="button"
          onClick={subtractValue}
          disabled={amount <= 0 || amount === ""}
        >
          −
        </button>
        <button type="button" onClick={addValue}>
          +
        </button>
      </div>
    </div>
  );
};


export default CustomInputField;

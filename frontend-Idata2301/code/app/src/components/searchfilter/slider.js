import React, { useState, useEffect, useRef } from 'react';

import './slider.css';



const DualRangeSlider = ({ label, min, max, step = 0.1, callback }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const fromSliderRef = useRef(null);
  const toSliderRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  useEffect(() => {
    // Initial gradient background update
    updateSliderBackground();
  }, [minValue, maxValue]);

  const updateSliderBackground = () => {
    const fromSlider = fromSliderRef.current;
    const toSlider = toSliderRef.current;
    const rangeDistance = toSlider.max - toSlider.min;
    const fromPosition = fromSlider.value - toSlider.min;
    const toPosition = toSlider.value - toSlider.min;

    toSlider.style.background = `linear-gradient(
      to right,
      #C6C6C6 0%,
      #C6C6C6 ${(fromPosition / rangeDistance) * 100}%,
      #25daa5 ${(fromPosition / rangeDistance) * 100}%,
      #25daa5 ${(toPosition / rangeDistance) * 100}%, 
      #C6C6C6 ${(toPosition / rangeDistance) * 100}%, 
      #C6C6C6 100%)`;
  };

  // Ensure min value never exceeds max value
  const handleSliderInput = () => {
    let newMin = parseFloat(fromSliderRef.current.value);
    let newMax = parseFloat(toSliderRef.current.value);

    if (newMin > newMax) {
      newMin = newMax;
    }

    setMinValue(newMin);
    setMaxValue(newMax);
  };

  // Ensure max value never goes below min value
  const handleInputChange = () => {
    let newMin = parseFloat(fromInputRef.current.value);
    let newMax = parseFloat(toInputRef.current.value);

    if (newMin > newMax) {
      newMax = newMin;
    }

    setMinValue(newMin);
    setMaxValue(newMax);
  };

  const handleChange = () => {
    callback(minValue, maxValue);
  };

  // Handle change for min slider/input
  const handleFromSliderChange = () => {
    const fromSlider = fromSliderRef.current;
    const toSlider = toSliderRef.current;
    let newMin = parseFloat(fromSlider.value);
    let newMax = parseFloat(toSlider.value);

    if (newMin > newMax) {
      newMin = newMax;
    }

    setMinValue(newMin);
    setMaxValue(newMax);
    updateSliderBackground();
    handleChange();
  };

  // Handle change for max slider/input
  const handleToSliderChange = () => {
    const fromSlider = fromSliderRef.current;
    const toSlider = toSliderRef.current;
    let newMin = parseFloat(fromSlider.value);
    let newMax = parseFloat(toSlider.value);

    if (newMin > newMax) {
      newMax = newMin;
    }

    setMinValue(newMin);
    setMaxValue(newMax);
    updateSliderBackground();
    handleChange();
  };

  return (
    <div className="dual-range-slider-container">
      <div className="dual-range-slider-control" style={{ textAlign: 'center' }}>
        {label}
      </div>

      <div className="dual-range-slider-control">
        <input
          ref={fromSliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onInput={handleSliderInput}
          onChange={handleFromSliderChange}
          className="dual-range-slider"
        />
        <input
          ref={toSliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onInput={handleSliderInput}
          onChange={handleToSliderChange}
          className="dual-range-slider"
        />
      </div>

      <div className="dual-range-slider-form-control">
        <div>
          <div>Min</div>
          <input
            ref={fromInputRef}
            type="number"
            min={min}
            max={max}
            step={step}
            value={minValue}
            onChange={handleInputChange}
            onBlur={handleChange}
            className="dual-range-slider-number-input"
          />
        </div>
        <div>
          <div>Max</div>
          <input
            ref={toInputRef}
            type="number"
            min={min}
            max={max}
            step={step}
            value={maxValue}
            onChange={handleInputChange}
            onBlur={handleChange}
            className="dual-range-slider-number-input"
          />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;


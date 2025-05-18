import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';


import './slider.css';



const DualRangeSlider = forwardRef(({ label, min, max, step = 0.1, callback }, ref) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const fromSliderRef = useRef(null);
  const toSliderRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  // expose imperative methods to parent
  useImperativeHandle(ref, () => ({
    updateMinValue(newMin) {
      setMinValue(newMin);
      // update slider input element as well (optional)
      if (fromSliderRef.current) fromSliderRef.current.value = newMin;
    },
    updateMaxValue(newMax) {
      setMaxValue(newMax);
      if (toSliderRef.current) toSliderRef.current.value = newMax;
    }
  }));

  useEffect(() => {
    // Initial gradient background update
    updateSliderBackground();
  }, [minValue, maxValue]);

  const updateSliderBackground = () => {
    const fromSlider = fromSliderRef.current;
    fromSlider.style.zIndex = 3;
    fromSlider.style.background = "transparent";

    const toSlider = toSliderRef.current;
    const rangeDistance = toSlider.max - toSlider.min;
    const fromPosition = fromSlider.value - toSlider.min;
    const toPosition = toSlider.value - toSlider.min;

    toSlider.style.background = `linear-gradient(
      to right,
      transparent 0%,
      transparent ${(fromPosition / rangeDistance) * 100}%,
      #0062e3 ${(fromPosition / rangeDistance) * 100}%,
      #0062e3 ${(toPosition / rangeDistance) * 100}%, 
      transparent ${(toPosition / rangeDistance) * 100}%, 
      transparent 100%)`;
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
    callback(newMin, newMax); // Use new values directly
  };
  

  const handleChange = () => {
    callback(minValue, maxValue);
  };

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
    callback(newMin, newMax); // Use new values directly
  };
  
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
    callback(newMin, newMax); // Use new values directly
  };
  

  return (
    <div className="dual-range-slider-container">
      <div className="dual-range-slider-control" style={{ textAlign: 'center' }}>
        {label}
      </div>

      <div className="dual-range-slider-control dual-range-slider-sliders-container">
        <input
          ref={fromSliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => {
            handleFromSliderChange();
            // handleSliderInput();
          }}
          className="dual-range-slider"
        />
        <input
          ref={toSliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => {
            handleToSliderChange();
            // handleSliderInput();
          }}
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
});


export default DualRangeSlider;


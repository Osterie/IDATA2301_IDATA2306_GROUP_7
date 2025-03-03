// import React from "react";
import "./filter.css";
import DualRangeSlider from "./slider";

const FilterSidebar = () => {


  const handlePriceRangeChange = (min, max) => {
    console.log('Min:', min, 'Max:', max);
  };


  return (
    <div className="filter-sidebar">
      {/* Sort By */}
      <div className="filter-section">
        <label htmlFor="sort">Sort by</label>
        <select id="sort">
          <option value="price">Price</option>
          <option value="time">Time</option>
          <option value="transfers">Transfers</option>
        </select>
      </div>
      
      {/* Price Range */}
      <div className="filter-section">
        <DualRangeSlider label="Price Range" min={0} max={1000} callback={handlePriceRangeChange} />
      </div>
      
      {/* Stops */}
      <div className="filter-section">
        <label>Stops</label>
        <div>
          <input type="checkbox" id="direct" />
          <label htmlFor="direct">Direct</label>
        </div>
        <div>
          <input type="checkbox" id="one-stop" />
          <label htmlFor="one-stop">1 Stop</label>
        </div>
        <div>
          <input type="checkbox" id="two-plus-stops" />
          <label htmlFor="two-plus-stops">2+ Stops</label>
        </div>
      </div>
      
      {/* Company */}
      <div className="filter-section">
        <label>Company</label>
        <div>
          <input type="checkbox" id="klm" />
          <label htmlFor="klm">KLM</label>
        </div>
        <div>
          <input type="checkbox" id="norwegian" />
          <label htmlFor="norwegian">Norwegian</label>
        </div>
        <div>
          <input type="checkbox" id="sas" />
          <label htmlFor="sas">Scandinavian Airlines</label>
        </div>
        <div>
          <input type="checkbox" id="wideroe" />
          <label htmlFor="wideroe">Wideroe</label>
        </div>
      </div>
      
      {/* Travel Time */}
      <div className="filter-section">
      <DualRangeSlider label="Travel time (t)" min={1} max={24} callback={handlePriceRangeChange} />

      </div>
    </div>
  );
};

export default FilterSidebar;

import React, { useState } from "react";
import "./filter.css";
import DualRangeSlider from "./slider";

const FilterSidebar = () => {
  const [showStops, setShowStops] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState({
    all: false,
    klm: false,
    norwegian: false,
    sas: false,
    wideroe: false,
  });

  const handleCompanyChange = (company) => {
    if (company === "all") {
      const newState = !selectedCompanies.all;
      setSelectedCompanies({
        all: newState,
        klm: newState,
        norwegian: newState,
        sas: newState,
        wideroe: newState,
      });
    } else {
      const updatedCompanies = { ...selectedCompanies, [company]: !selectedCompanies[company] };
      updatedCompanies.all = Object.keys(updatedCompanies)
        .filter((key) => key !== "all")
        .every((key) => updatedCompanies[key]);
      setSelectedCompanies(updatedCompanies);
    }
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
        <DualRangeSlider label="Price Range" min={0} max={1000} callback={(min, max) => console.log(min, max)} />
      </div>

      {/* Stops Dropdown */}
      <div className="filter-section">
        <button className="dropdown-btn" onClick={() => setShowStops(!showStops)}>
          Stops {showStops ? "▲" : "▼"}
        </button>
        {showStops && (
          <div className="dropdown-content">
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
        )}
      </div>

      {/* Company Dropdown */}
      <div className="filter-section">
        <button className="dropdown-btn" onClick={() => setShowCompanies(!showCompanies)}>
          Company {showCompanies ? "▲" : "▼"}
        </button>
        {showCompanies && (
          <div className="dropdown-content">
            <div>
              <input
                type="checkbox"
                id="all-companies"
                checked={selectedCompanies.all}
                onChange={() => handleCompanyChange("all")}
              />
              <label htmlFor="all-companies"><strong>All Companies</strong></label>
            </div>
            {["klm", "norwegian", "sas", "wideroe"].map((company) => (
              <div key={company}>
                <input
                  type="checkbox"
                  id={company}
                  checked={selectedCompanies[company]}
                  onChange={() => handleCompanyChange(company)}
                />
                <label htmlFor={company}>{company.toUpperCase()}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Travel Time */}
      <div className="filter-section">
        <DualRangeSlider label="Travel time (t)" min={1} max={24} callback={(min, max) => console.log(min, max)} />
      </div>

    </div>
  );
};

export default FilterSidebar;

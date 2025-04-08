import React, { useState } from "react";
import "./filter.css";
import DualRangeSlider from "./slider";

function findMinPrice(flights) {
  return Math.min(...flights.map(flight => flight.price));
}
function findMaxPrice(flights) {
  return Math.max(...flights.map(flight => flight.price));
}

// Dynamically extract unique companies from the flights array
function getUniqueCompanies(flights) {
  const companies = flights.map(flight => flight.scheduledFlight.flight.company);
  return [...new Set(companies)]; // Remove duplicates
};

const FilterSidebar = ({ flights, setFlights }) => {
  const [showStops, setShowStops] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const companies = getUniqueCompanies(flights);
  const [selectedCompanies, setSelectedCompanies] = useState({
    all: true,  // "All Companies" checked by default
    ...companies.reduce((acc, company) => {
      acc[company] = true;  // All individual companies checked by default
      return acc;
    }, {})
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for mobile toggle

  console.log(flights)


  const handleCompanyChange = (company) => {
    const updatedCompanies = { ...selectedCompanies, [company]: !selectedCompanies[company] };
  
    // If 'all' is checked or unchecked, update all company checkboxes
    if (company === "all") {
      const newState = !selectedCompanies.all;
      const updatedState = companies.reduce((acc, company) => {
        acc[company] = newState;
        return acc;
      }, {});
      setSelectedCompanies({ ...updatedState, all: newState });
    } else {
      setSelectedCompanies(updatedCompanies);
    }
  };

  // Callback for price range change
  const handlePriceRangeChange = (min, max) => {
    
    // Update flights to hide those outside the selected price range
    const updatedFlights = flights.map(flight => {
      if (flight.price < min || flight.price > max) {
        return { ...flight, isHidden: true };  // Set isHidden to true if price is outside range
      } else {
        return { ...flight, isHidden: false };  // Otherwise, make sure it's visible
      }
    });
    
    setFlights(updatedFlights);  // Update flights in parent component
  };

  return (
    <div className="sidebar-mother">
      {/* Mobile Button to Toggle Sidebar */}
      <button className="toggle-sidebar-btn" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
        {isSidebarVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar - Visible on both PC and mobile, but toggled on mobile */}
      <div className={`filter-sidebar ${isSidebarVisible ? "show" : ""}`}>
        {/* Finish Button to Close Sidebar (Only visible on mobile) */}
        <button className="finish-btn" onClick={() => setIsSidebarVisible(false)}>
          Finish
        </button>

        {/* Sort By */}
        <div className="filter-section">
          <label className="filter-title" htmlFor="sort">Sort by</label>
          <select id="sort">
            <option value="price">Price</option>
            <option value="time">Time</option>
            <option value="transfers">Transfers</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <DualRangeSlider label="Price Range" min={findMinPrice(flights)} max={findMaxPrice(flights)} callback={handlePriceRangeChange} />
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
                  checked={Object.values(selectedCompanies).every(val => val)}
                  onChange={() => handleCompanyChange("all")}
                />
                <label htmlFor="all-companies"><strong>All Companies</strong></label>
              </div>
              {companies.map((company) => (
                <div key={company}>
                  <input
                    type="checkbox"
                    id={company}
                    checked={selectedCompanies[company] || false}
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
    </div>
  );
};

export default FilterSidebar;



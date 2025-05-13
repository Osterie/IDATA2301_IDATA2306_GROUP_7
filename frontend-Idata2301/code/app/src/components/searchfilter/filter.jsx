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

  const handleCompanyChange = (company) => {
    let updatedCompanies;
  
    if (company === "all") {
      const newState = !selectedCompanies.all;
      updatedCompanies = {
        all: newState,
        ...companies.reduce((acc, company) => {
          acc[company] = newState;
          return acc;
        }, {})
      };
    } else {
      updatedCompanies = {
        ...selectedCompanies,
        [company]: !selectedCompanies[company],
        all: false, // If any individual company is changed, uncheck "all"
      };
    }
  
    setSelectedCompanies(updatedCompanies);
  
    // Re-filter flights using current price range and updated companies
    const minPrice = findMinPrice(flights);
    const maxPrice = findMaxPrice(flights);
  
    const updatedFlights = flights.map(flight => {
      const flightCompany = flight.scheduledFlight.flight.company;
      const isPriceInRange = flight.price >= minPrice && flight.price <= maxPrice;
      const isCompanySelected = updatedCompanies[flightCompany];
  
      const isHidden = !(isPriceInRange && isCompanySelected);
      return { ...flight, isHidden };
    });
  
    setFlights(updatedFlights);
  };
  

  // Callback for price range change
  const handlePriceRangeChange = (min, max) => {
    const updatedFlights = flights.map(flight => {
      const flightCompany = flight.scheduledFlight.flight.company;
      const isPriceInRange = flight.price >= min && flight.price <= max;
      const isCompanySelected = selectedCompanies[flightCompany];
  
      const isHidden = !(isPriceInRange && isCompanySelected);
      return { ...flight, isHidden };
    });
  
    setFlights(updatedFlights);
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
            <option value="price-ascending">Price, ascending</option>
            <option value="price-descending">Price, descending</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <DualRangeSlider label="Price Range" min={findMinPrice(flights)} max={findMaxPrice(flights)} callback={handlePriceRangeChange} />
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

      </div>
    </div>
  );
};

export default FilterSidebar;



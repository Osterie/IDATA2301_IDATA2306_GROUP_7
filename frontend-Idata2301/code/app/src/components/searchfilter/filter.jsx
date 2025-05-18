import React, { useState, useEffect, useRef } from "react";
import "./filter.css";
import DualRangeSlider from "./slider";

function findMinPrice(flights) {
  return Math.min(...flights.map((flight) => flight.price));
}
function findMaxPrice(flights) {
  return Math.max(...flights.map((flight) => flight.price));
}

// Dynamically extract unique companies from the flights array
function getUniqueCompanies(flights) {
  const companies = flights.map(
    (flight) => flight.scheduledFlight.flight.company.name
  );
  return [...new Set(companies)]; // Remove duplicates
}

const filterFlights = (flightsToFilter, min, max, companies) => {
  const updatedFlights = flightsToFilter.map((flight) => {
    const flightCompany = flight.scheduledFlight.flight.company.name;
    const isPriceInRange =
      flight.price >= min && flight.price <= max;
    const isCompanySelected = companies[flightCompany];

    const isFilteredOut = !(isPriceInRange && isCompanySelected);
    return { ...flight, isFilteredOut };
  });
  return updatedFlights;
};

const sortFlights = (flightsToSort, option) => {
  const sorted = [...flightsToSort];

  switch (option) {
    case "cheap":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "expensive":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "soon":
      sorted.sort(
        (a, b) =>
          new Date(a.scheduledFlight.date) - new Date(b.scheduledFlight.date)
      );
      break;
    case "late":
      sorted.sort(
        (a, b) =>
          new Date(b.scheduledFlight.date) - new Date(a.scheduledFlight.date)
      );
      break;
    default:
      break;
  }

  return sorted;
};

const FilterSidebar = ({ flights, setFlights }) => {
  const [sortOption, setSortOption] = useState("cheap");
  const [showCompanies, setShowCompanies] = useState(false);
  const companies = getUniqueCompanies(flights);
  const [selectedCompanies, setSelectedCompanies] = useState({
    all: true, // "All Companies" checked by default
    ...companies.reduce((acc, company) => {
      acc[company] = true; // All individual companies checked by default
      return acc;
    }, {}),
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for mobile toggle
  const [priceRange, setPriceRange] = useState({
    min: findMinPrice(flights),
    max: findMaxPrice(flights),
  });
  const [fullPriceRange, setFullPriceRange] = useState({
    min: findMinPrice(flights),
    max: findMaxPrice(flights),
  });
  const [forceUpdate, setForceUpdate] = useState(0);

  const sliderRef = useRef(null);
  
    // Whenever min or max values update, call the exposed methods:
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.updateMinValue(fullPriceRange.min);
      sliderRef.current.updateMaxValue(fullPriceRange.max);
    }
  }, [fullPriceRange.min, fullPriceRange.max, forceUpdate]);


  useEffect(() => {
    if (!flights.isNewSearch) return;

    const min = findMinPrice(flights);
    const max = findMaxPrice(flights);
    setPriceRange({ min, max });
    setFullPriceRange({
      min: findMinPrice(flights),
      max: findMaxPrice(flights),
    });
    setForceUpdate((f) => f + 1);

    const newCompanies = getUniqueCompanies(flights);
    setSelectedCompanies({
      all: true,
      ...newCompanies.reduce((acc, company) => {
        acc[company] = true;
        return acc;
      }, {}),
    });

    const sorted = sortFlights(flights, sortOption);
    setFlights(sorted);
    flights.isNewSearch = false; // Reset the flag after processing
  }, [flights]);


  const handleCompanyChange = (company) => {
    let updatedCompanies;

    if (company === "all") {
      const newState = !selectedCompanies.all;
      updatedCompanies = {
        all: newState,
        ...companies.reduce((acc, company) => {
          acc[company] = newState;
          return acc;
        }, {}),
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
    const minPrice = priceRange.min;
    const maxPrice = priceRange.max;

    const updatedFlights = filterFlights(flights, minPrice, maxPrice, updatedCompanies);

    setFlights(updatedFlights);
  };



  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max }); // Save the values for later use

    let updatedFlights = filterFlights(flights, min, max, selectedCompanies);

    updatedFlights = sortFlights(updatedFlights, sortOption);

    setFlights(updatedFlights);
  };
  

  return (
    <div className="sidebar-mother">
      {/* Mobile Button to Toggle Sidebar */}
      <button
        className="toggle-sidebar-btn"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar - Visible on both PC and mobile, but toggled on mobile */}
      <div className={`filter-sidebar ${isSidebarVisible ? "show" : ""}`}>
        {/* Finish Button to Close Sidebar (Only visible on mobile) */}
        <button
          className="finish-btn"
          onClick={() => setIsSidebarVisible(false)}
        >
          Finish
        </button>

        {/* Sort By */}
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => {
            const newSort = e.target.value;
            setSortOption(newSort);

            const updatedFlights = sortFlights(flights, newSort);
            setFlights(updatedFlights);
          }}
        >
          <option value="cheap">Cheapest</option>
          <option value="expensive">Most expensive</option>
          <option value="soon">Soonest</option>
          <option value="late">Latest</option>
        </select>

        {/* Price Range */}
        <div className="filter-section">
          <DualRangeSlider
              ref={sliderRef}

            // key={`${findMinPrice(flights)}-${findMaxPrice(flights)}`} // 👈 key changes when min/max change
            label="Price Range"
            min={fullPriceRange.min}
            max={fullPriceRange.max}
            callback={handlePriceRangeChange}
          />
        </div>

        {/* Company Dropdown */}
        <div className="filter-section">
          <button
            className="dropdown-btn"
            onClick={() => setShowCompanies(!showCompanies)}
          >
            Company {showCompanies ? "▲" : "▼"}
          </button>
          {showCompanies && (
            <div className="dropdown-content">
              <div>
                <input
                  type="checkbox"
                  id="all-companies"
                  checked={Object.values(selectedCompanies).every((val) => val)}
                  onChange={() => handleCompanyChange("all")}
                />
                <label htmlFor="all-companies">
                  <strong>All Companies</strong>
                </label>
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

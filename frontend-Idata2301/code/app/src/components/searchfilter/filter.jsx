import { useState, useEffect, useRef } from "react";
import "./filter.css";
import DualRangeSlider from "./slider";
import { calculateFinalPriceInUserCurrency } from "../../utils/currencyUtils";
import {
  findMinPrice,
  findMaxPrice,
  getUniqueCompanies,
  sortFlights,
  filterFlights,
} from "../../utils/filterUtils";

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

  // Handles a change to the company class
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

    const updatedFlights = filterFlights(
      flights,
      minPrice,
      maxPrice,
      updatedCompanies
    );

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
          className="sorting-dropdown"
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

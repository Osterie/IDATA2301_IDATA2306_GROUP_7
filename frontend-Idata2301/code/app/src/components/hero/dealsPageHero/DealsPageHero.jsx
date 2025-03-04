import React from 'react';
import './dealsPageHero.css';
import SearchBar from '../../searchBar/SearchBar'; // Import the SearchBar

const DealsPageHero = () => {
  return (
    <section className="deals-hero">
      <div className="deals-hero-container">
        <SearchBar />
      </div>
    </section>
  );
};

export default DealsPageHero;
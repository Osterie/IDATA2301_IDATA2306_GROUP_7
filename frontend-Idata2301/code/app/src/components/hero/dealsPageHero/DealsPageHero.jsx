import React from 'react';
import './dealsPageHero.css';
import SearchBar from '../../searchBar/SearchBar';

const DealsPageHero = ({ setFlights, setActivePage }) => {
  return (
    <section className="deals-hero">
      <div className="deals-hero-container">
        <SearchBar setFlights={setFlights} setActivePage={setActivePage} />
      </div>
    </section>
  );
};

export default DealsPageHero;

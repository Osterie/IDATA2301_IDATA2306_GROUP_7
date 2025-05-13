import React from 'react';
import './mainPageHero.css';
import SearchBar from '../../searchBar/SearchBar';

const MainPageHero = ({ setFlights, setActivePage }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1>Find your next adventure</h1>
        <p>Search for the best deals on flights all around the world</p>
        <SearchBar setFlights={setFlights} setActivePage={setActivePage} />  {/* Pass setFlights and setActivePage to SearchBar */}
      </div>
    </section>
  );
};

export default MainPageHero;

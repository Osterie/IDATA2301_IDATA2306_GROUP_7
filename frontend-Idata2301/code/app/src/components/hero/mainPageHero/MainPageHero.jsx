import React from 'react';
import './mainPageHero.css';
import SearchBar from '../../searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const MainPageHero = ({ setFlights }) => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-container">
        <h1>Find your next adventure</h1>
        <p>Search for the best deals on flights all around the world</p>
        <SearchBar setFlights={setFlights} navigate={navigate} />
      </div>
    </section>
  );
};

export default MainPageHero;

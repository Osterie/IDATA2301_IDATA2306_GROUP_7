import React from 'react';
import './mainPageHero.css';
import SearchBar from '../../searchBar/SearchBar';

const MainPageHero = () => {
    return (
        <section className="hero">
            <div className="hero-container">
                <h1>Find your next adventure</h1>
                <p>Search for the best deals on flights and hotels</p>
                <SearchBar />
            </div>
        </section>
    );
};

export default MainPageHero;
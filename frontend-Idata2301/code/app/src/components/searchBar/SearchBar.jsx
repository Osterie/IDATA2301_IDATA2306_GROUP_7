import React from 'react';
import './searchBar.css';

const SearchBar = () => {
    return (
        <>
            <form className="search-form">
                <input type="text" placeholder="From" name="from" required />
                <input type="text" placeholder="To" name="to" required />
                <input type="date" name="departure-date" required />
                <input type="date" name="return-date" required />
                <button type="submit">Search For Flights</button>
            </form>
        </>
    );
};

export default SearchBar;
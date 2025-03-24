import React, { useState } from 'react';
import './searchBar.css';
import PassengerAmountField from './PassengerAmountField';

const SearchBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <form className="search-form">
                <input type="text" placeholder="From" name="from" required />
                <input type="text" placeholder="To" name="to" required />
                <input type="date" name="departure-date" required />
                <input type="date" name="return-date" required />
                
                <button type="button" className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                    Select Passengers
                </button>
                
                {showDropdown && (
                    <PassengerAmountField/>
                )}
                
                <button className="call-to-action" type="submit">Search For Flights</button>
            </form>
        </>
    );
};

export default SearchBar;

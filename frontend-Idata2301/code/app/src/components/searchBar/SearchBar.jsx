import React, { useState } from 'react';
import './searchBar.css';

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
                    <div className="dropdown-window">
                        <select name="Classes" required>
                            <option value="0">First class</option>
                            <option value="1">Business class</option>
                            <option value="2">Economy class</option>
                        </select>
                        
                        <input className="adult-input" type="number" />
                    </div>
                )}
                
                <button type="submit">Search For Flights</button>
            </form>
        </>
    );
};

export default SearchBar;

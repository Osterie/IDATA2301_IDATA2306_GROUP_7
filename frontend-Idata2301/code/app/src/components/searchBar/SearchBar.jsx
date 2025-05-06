import React, { useState } from 'react';
import './searchBar.css';
import PassengerAmountField from './PassengerAmountField';

import {sendApiRequest} from "../../library/requests";


const SearchBar = ({ setFlights, setActivePage  }) => {  // Receive setFlights as a prop
    const [formData, setFormData] = useState({
        departure: '',
        arrival: '',
        fromDate: '',
        toDate: ''
    });
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await sendApiRequest(
                "POST", "/searchForFlights",

                    function (fetchedData) {
                        // const fetchedData = response.json();
                        console.log('Flight search results:', fetchedData);
                        setFlights(fetchedData);  // Store flights in state
                        setActivePage("deals");  // ✅ Navigate to the Deals page
                    },
                    JSON.stringify(formData),
                    function (errorResponse) {
                        console.log("Error: " + errorResponse);
                        throw new Error('Network response was not ok');
                    }
            )

        } catch (error) {
            console.error('Error searching for flights:', error);
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input className="search-bar-input" type="text" placeholder="From" name="departure" value={formData.departure} onChange={handleChange} required />
            <input className="search-bar-input" type="text" placeholder="To" name="arrival" value={formData.arrival} onChange={handleChange} required />
            <input className="search-bar-input" type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
            <input className="search-bar-input" type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />

            <button type="button" className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                Select Passengers
            </button>

            {showDropdown && <PassengerAmountField />}

            <button className="call-to-action" type="submit">Search For Flights</button>
        </form>
    );
};

export default SearchBar;

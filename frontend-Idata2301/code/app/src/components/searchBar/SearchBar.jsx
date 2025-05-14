import React, { useState, useEffect } from 'react';
import './searchBar.css';
import PassengerAmountField from './PassengerAmountField';

import {sendApiRequest} from "../../library/requests";


const getSearchTerms = async () => {
    try {
        await sendApiRequest(
            "GET", "/getSearchTerms",
            function (response) {
                console.log(response)
                // const searchTerms = response.json();
                // console.log('Search terms:', searchTerms);
            },
            null,
            function (errorResponse) {
                console.log("Error: " + errorResponse);
                throw new Error('Network response was not ok for fetching search terms');
            }
        )

    }
    catch (error) {
        console.error('Error fetching search terms:', error);
    }
}

const SearchBar = ({ setFlights, setActivePage, searchParams, setSearchParams  }) => {  // Receive setFlights as a prop
    const [showDropdown, setShowDropdown] = useState(false);


    // Fetch search terms when the component mounts
    useEffect(() => {
        getSearchTerms();
    }, []);

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
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
                    JSON.stringify(searchParams),
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
            <input className="search-bar-input" type="text" placeholder="From" name="departure" value={searchParams.departure} onChange={handleChange} required />
            <input className="search-bar-input" type="text" placeholder="To" name="arrival" value={searchParams.arrival} onChange={handleChange} required />
            <input className="search-bar-input" type="date" name="fromDate" value={searchParams.fromDate} onChange={handleChange} required />
            <input className="search-bar-input" type="date" name="toDate" value={searchParams.toDate} onChange={handleChange} required />

            <button type="button" className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                Select Passengers
            </button>

            {showDropdown && <PassengerAmountField />}

            <button className="call-to-action" type="submit">Search For Flights</button>
        </form>
    );
};

export default SearchBar;

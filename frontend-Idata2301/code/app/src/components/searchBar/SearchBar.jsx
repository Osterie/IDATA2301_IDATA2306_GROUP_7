import React, { useState, useEffect } from 'react';
import './searchBar.css';
import PassengerAmountField from './PassengerAmountField';

import {sendApiRequest} from "../../library/requests";




const SearchBar = ({ setFlights, setActivePage, searchParams, setSearchParams  }) => {  // Receive setFlights as a prop
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerms, setSearchTerms] = useState([]);
    const [searchTermsMap, setSearchTermsMap] = useState(new Map());
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [focusedInput, setFocusedInput] = useState(null);


    // Fetch search terms when the component mounts
    useEffect(() => {
        setSearchTerms(getSearchTerms());
    }, []);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (searchTermsMap.has(value)) {
            value = searchTermsMap.get(value);
        }
        setSearchParams({ ...searchParams, [name]: value });
        
        if (name === "departure") {
            const filtered = searchTerms.filter(term =>
                term.toLowerCase().includes(value.toLowerCase())
            );
            setFromSuggestions(filtered);
            setFocusedInput("departure");
        } else if (name === "arrival") {
            const filtered = searchTerms.filter(term =>
                term.toLowerCase().includes(value.toLowerCase())
            );
            setToSuggestions(filtered);
            setFocusedInput("arrival");
        }
    };

    const handleSuggestionClick = (inputName, value) => {
        if (searchTermsMap.has(value)) {
                value = searchTermsMap.get(value);
        }
        setSearchParams({ ...searchParams, [inputName]: value });
        if (inputName === "departure") {
            setFromSuggestions([]);
        } else {
            setToSuggestions([]);
        }
        setFocusedInput(null);
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

    const getSearchTerms = async () => {
        try {
            await sendApiRequest(
                "GET", "/getSearchTerms",
                function (response) {

                    const cities = response.map((item) => item.city);
                    const airports = response.map((item) => item.airportCode);

                    const searchTermsMap = new Map();
                    const searchTerms = [];

                    for (let i = 0; i < cities.length; i++) {
                        searchTermsMap.set(cities[i], airports[i]);
                        searchTerms.push(cities[i]);
                        searchTerms.push(airports[i]);
                    }
                
                    setSearchTermsMap(searchTermsMap);
                    setSearchTerms(searchTerms);
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

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="autocomplete-wrapper">
                <input
                    className="search-bar-input"
                    type="text"
                    placeholder="From"
                    name="departure"
                    autoComplete="off"         // disables browser autofill
                    value={searchParams.departure}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput("departure")}
                    required
                />
                {focusedInput === "departure" && fromSuggestions.length > 0 && (
                    <ul className="autocomplete-suggestions">
                        {fromSuggestions.map((term, idx) => (
                            <li key={idx} onClick={() => handleSuggestionClick("departure", term)}>
                                {term}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="autocomplete-wrapper">
                <input
                    className="search-bar-input"
                    type="text"
                    placeholder="To"
                    name="arrival"
                    autoComplete="off"         // disables browser autofill
                    value={searchParams.arrival}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput("arrival")}
                    required
                />
                {focusedInput === "arrival" && toSuggestions.length > 0 && (
                    <ul className="autocomplete-suggestions">
                        {toSuggestions.map((term, idx) => (
                            <li key={idx} onClick={() => handleSuggestionClick("arrival", term)}>
                                {term}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

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

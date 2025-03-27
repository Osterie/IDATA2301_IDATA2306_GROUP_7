import React, { useState } from 'react';
import './searchBar.css';
import PassengerAmountField from './PassengerAmountField';

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
            // const response = await fetch('http://localhost:8080/searchForFlights', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            
            // const fetchedData = await response.json();
            // console.log('Flight search results:', fetchedData);

            let testData = [
                {
                    "id": 8,
                    "flightClassId": {
                        "id": 7,
                        "flightClass": {
                            "id": 1,
                            "name": "Economy"
                        },
                        "flight": {
                            "id": 20,
                            "name": "KLM Flight 605",
                            "company": "KLM Royal Dutch Airlines"
                        },
                        "availableSeats": 40
                    },
                    "price": 800,
                    "priceCode": "USD",
                    "provider": "eDreams",
                    "discount": 10,
                    "scheduledFlight": {
                        "id": 28,
                        "flight": {
                            "id": 25,
                            "name": "AF Flight 123",
                            "company": "Air France"
                        },
                        "route": {
                            "id": 8,
                            "departureAirport": {
                                "id": 1,
                                "airportCode": "JFK",
                                "city": "New York"
                            },
                            "arrivalAirport": {
                                "id": 16,
                                "airportCode": "SIN",
                                "city": "Singapore"
                            }
                        },
                        "date": "2025-04-08"
                    }
                }
            ];

            const data = testData;  // TODO Replace with fetchedData

            setFlights(data);  // Store flights in state
            setActivePage("deals");  // ✅ Navigate to the Deals page
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

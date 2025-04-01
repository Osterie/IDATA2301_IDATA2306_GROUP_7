import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/favorites";

const FavoriteFlightsPage = () => {
    const [flights, setFlights] = useState([]);

    // Fetch favorite flights from the backend
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setFlights(response.data))
            .catch(error => console.error("Error fetching flights:", error));
    }, []);

    // Function to add a flight
    const addFlight = () => {
        // TODO: For testing adding, change later
        const newFlight = {
            flightNumber: "AA123",
            airline: "American Airlines",
            departure: "JFK",
            destination: "LAX"
        };

        axios.post(API_URL, newFlight)
            .then(response => setFlights([...flights, response.data]))
            .catch(error => console.error("Error adding flight:", error));
    };

    // Function to delete a flight
    const deleteFlight = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setFlights(flights.filter(flight => flight.id !== id)))
            .catch(error => console.error("Error deleting flight:", error));
    };

    return (
        <div>
            <h2>Favorite Flights</h2>
            <button onClick={addFlight}>Add Flight</button>
            <ul>
                {flights.map(flight => (
                    <li key={flight.id}>
                        {flight.airline} {flight.flightNumber} ({flight.departure} → {flight.destination})
                        <button onClick={() => deleteFlight(flight.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteFlightsPage;

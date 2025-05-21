import React, { useEffect, useState } from "react";
import "./purchases.css";
import { sendApiRequest } from "../../../library/requests.js";
import FlightCard from "../../cards/searchedFlights/FlightCard.jsx";

const PurchasedFlights = ({ user, setSelectedFlight, setActivePage }) => {
  const [flights, setFlights] = useState([]);

  const fetchPurchasedFlights = async () => {
    await sendApiRequest(
      "GET",
      `/purchases?userId=${user.id}`,
      (response) => {
        if (response && response.length > 0) {
          setFlights(response);
        }
      },
      null,
      (error) => {
        console.error("Error fetching purchased flights:", error);
      }
    );
  };

  useEffect(() => {
    if (user) {
      fetchPurchasedFlights();
    }
  }, []);

  // 🔁 Group by flight.price.id
  const groupedFlights = flights.reduce((map, flight) => {
    const priceId = flight.price.id;
    if (!map[priceId]) {
      map[priceId] = { flight: flight.price, count: 1, dates: [flight.date] };
    } else {
      map[priceId].count += 1;
      map[priceId].dates.push(flight.date);
    }
    return map;
  }, {});

  const groupedList = Object.values(groupedFlights);

  return (
    <div>
      <h2>Purchased Flights</h2>
      <p>Here is a list of flights you have purchased.</p>

      <div className="flights-container">
        {groupedList.length > 0 ? (
          groupedList.map(({ flight, count, dates }) => (
            <div key={flight.id} className="cardWithCount">
              <FlightCard
                  key={flight.id}
                flight={flight}
                purchasable={false}
                purchaseDate={dates[0]} // optional: show first purchase date
                setSelectedFlight={setSelectedFlight}
                setActivePage={setActivePage}
              />
              <div className="purchaseCount">
                × {count}
              </div>
            </div>
          ))
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default PurchasedFlights;

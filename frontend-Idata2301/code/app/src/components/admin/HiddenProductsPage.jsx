import { useState, useEffect } from "react";
import { sendApiRequest } from "../../library/requests";
import FlightCard from "../cards/searchedFlights/FlightCard";
import "./hiddenProductsPage.css";

const HiddenProductsPage = ({ handleGoBack }) => {
  const [hiddenProducts, setHiddenProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch hidden flights from the backend
  const getAllHiddenProducts = async () => {
    await sendApiRequest(
      "GET",
      `/getHiddenProducts`,
      (response) => {
        // Handle the response as needed
        if (response && response.length > 0) {
          console.log(response);
          setLoading(false);
          setHiddenProducts(response);
        } else {
          console.log("No hidden flights found.");
        }
      },
      null, // No request body for GET
      (error) => {
        console.error("Error fetching hidden flights:", error);
        setError("The server is currently down. Please try again later.");
      }
    );
  };

  useEffect(() => {
    getAllHiddenProducts();
  }, []);

  const handleVisibilityChange = (updatedFlight) => {
    setHiddenProducts((prevFlights) =>
      prevFlights.map((flight) =>
        flight.id === updatedFlight.id ? updatedFlight : flight
      )
    );
  };

  return (
    <div>
      <button onClick={handleGoBack} className="back-button">
        ← Go Back
      </button>
      <h1 className="hidden-page-title">Hidden products</h1>

      {loading ? (
        <p>Loading hidden products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p> // Show the error message if there's an error
      ) : (
        <div>
          <p>Here is a list of all the hidden flight products.</p>

          <section className="hidden-page-container">
            <div className="flights-container flights-grid">
              {hiddenProducts.length > 0 ? (
                (console.log(hiddenProducts),
                hiddenProducts.map(
                  (flight) => (
                    console.log(flight),
                    (
                      <FlightCard
                        flight={flight}
                        purchasable={false}
                        purchaseDate={flight.date}
                        userIsAdmin={true}
                        onVisibilityChange={handleVisibilityChange}
                      />
                    )
                  )
                ))
              ) : (
                <p>No flights found.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default HiddenProductsPage;

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import FilterSidebar from "./components/searchfilter/filter";
import ProductCardContainer from "./components/cards/deals/ProductCardContainer";
import ProductCardHeader from "./components/cards/deals/ProductCardHeader";
import FlightsContainer from "./components/cards/searched-flights/FlightsContainer";
import MainPageHero from "./components/hero/mainPageHero/MainPageHero";
import DealsPageHero from "./components/hero/dealsPageHero/DealsPageHero";
import LogInPageHero from "./components/hero/account/logInPageHero/LogInPageHero";
import PurchaseHero from "./components/hero/purchaseHero/PurchaseHero";
import ShoppingCartHero from "./components/hero/shoppingCartPageHero/shoppingCartHero";
import CreateAccount from "./components/hero/account/createAccountHero/createAccountHero";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import AboutUs from "./components/about/AboutUs";
import AdminPage from "./components/admin/AdminPage";
import ManageUserPage from "./components/admin/ManageUserPage";
import { getAuthenticatedUser } from "./library/Identity/authentication";
import CookieConsent from "react-cookie-consent";
import SettingsMenu from "./components/settings/SettingsMenu";
import {
  hasConsent,
  setLastSearch,
  getLastSearch,
  setCountryFromIP,
} from "./utils/cookieUtils";
import FlightDetailPage from "./components/flightDetailPage/FlightDetailPage";

function App() {
  const [flights, setFlights] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [activePage, setActivePage] = useState(""); // <-- Define the activePage state here

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getAuthenticatedUser();
    setUser(loggedInUser);
  }, []);

  useEffect(() => {
    if (hasConsent()) {
      setCountryFromIP();
      const last = getLastSearch();
      if (last) console.log("Restoring search:", last);
    }
  }, []);

  useEffect(() => {
    if (flights.length > 0) {
      setLastSearch(flights);
    }
  }, [flights]);

  const handleNavClick = (page) => {
    setActivePage(page); // <-- Set the active page when navigation happens
    navigate(`/${page}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar onNavClick={handleNavClick} user={user} />
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPageHero setFlights={setFlights} navigate={navigate} />
                <ProductCardHeader />
                <ProductCardContainer />
              </>
            }
          />
          <Route
            path="/deals"
            element={
              <>
                <DealsPageHero setFlights={setFlights} />
                <section className="search-section">
                  <FilterSidebar flights={flights} setFlights={setFlights} />
                  <FlightsContainer
                    flights={flights}
                    user={user}
                    setSelectedFlight={setSelectedFlight}
                    navigate={navigate}
                  />
                </section>
              </>
            }
          />
          <Route
            path="/flight-details"
            element={
              selectedFlight ? (
                <FlightDetailPage flight={selectedFlight} />
              ) : (
                <div>Please select a flight from the deals page.</div>
              )
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<LogInPageHero onNavClick={handleNavClick} />} />
          <Route path="/admin" element={<AdminPage setActivePage={setActivePage} />} />
          <Route path="/manage-users" element={<ManageUserPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/settings" element={<SettingsMenu user={user} />} />
          <Route path="/shoppingCart" element={<ShoppingCartHero onNavClick={handleNavClick} />} />
          <Route path="/purchase" element={<PurchaseHero />} />
        </Routes>
      </main>

      <Footer />

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="userConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={30}
      >
        We use cookies to improve your experience and remember your preferences. By using this site, you agree to our use of cookies.
      </CookieConsent>
    </div>
  );
}

export default App;

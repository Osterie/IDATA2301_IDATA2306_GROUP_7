import React, { useState, useEffect } from "react";
import "./App.css";

// Pages
import HomePage from "./pages/HomePage";
import DealsPage from "./pages/DealsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage";

import LogInPageHero from "./components/hero/account/logInPageHero/LogInPageHero";
import ShoppingCartHero from "./components/hero/shoppingCartPageHero/shoppingCartHero";
import CreateAccount from "./components/hero/account/createAccountHero/createAccountHero";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import AdminPage from "./components/admin/AdminPage";
import ManageUserPage from "./components/admin/ManageUserPage";
import HiddenProductsPage from "./components/admin/HiddenProductsPage";
import { getAuthenticatedUser} from "./library/Identity/authentication"; // adjust path as needed
import FlightDetailPage from "./components/flightDetailPage/FlightDetailPage";
import { saveConvertionTableToLocalStorage } from "./utils/currencyUtils";

// Cookies
import {
  hasConsent,
  setLastSearch,
  getLastSearch,
  setUserInformationFromIp,
} from "./utils/cookieUtils";
import CookieConsent from "react-cookie-consent";

function App() {
  // TODO REMOVE THIS. ONLY TESTING!
  const [searchParams, setSearchParams] = useState({
    departure: "JFK",
    arrival: "SIN",
    fromDate: "2020-01-01",
    toDate: "2030-01-01",
    passengers: [
      { classType: { name: "Economy" }, amount: 1 },
      { classType: { name: "Business" }, amount: 0 },
      { classType: { name: "First" }, amount: 0 }
    ]
  });
  const [activePage, setActivePage] = useState("home");
  const [flights, setFlights] = useState([]);  // Store flight data
  const [user, setUser] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    const loggedInUser = getAuthenticatedUser();
    setUser(loggedInUser);
    saveConvertionTableToLocalStorage();
  }, []);

  // // Check JWT on load
  // useEffect(() => {
  //   checkJwtOnLoad();
  // }, []);

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  // Checks if user has already consented to cookies
  // If no consent: Ask
  useEffect(() => {
    if (hasConsent()) {
      setUserInformationFromIp(); // Automatically sets country, airport, currency
      const last = getLastSearch();
      if (last) console.log("Restoring search:", last);
    }
  }, []);
  
  useEffect(() => {
    if (flights.length > 0) {
      setLastSearch(flights);
    }
  }, [flights]);



  return (
    <div className="App">
      <header className="App-header">
        <Navbar onNavClick={handleNavClick} user={user} />
      </header>

      <main>
        {/* Landing page */}
        {activePage === "home" && (
          <>
            <HomePage setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} />
          </>
        )}
        {/* Searched flights and deals Page */}
        {activePage === "deals" && (
          <>
            <DealsPage setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} flights={flights} user={user} setSelectedFlight={setSelectedFlight}/>
          </>
        )}
        {/* Details page */}
        {activePage === "flight-details" && selectedFlight && (
          <FlightDetailPage searchParams={searchParams} flight={selectedFlight} />
        )}
        {/* About us information page */}
        {activePage === "about" && (
          <>
            <AboutUsPage />
          </>
        )}
        {/* Profile settings and other personal information */}
        {activePage === "profile" && (
          <>
            <ProfilePage user={user} setSelectedFlight={setSelectedFlight} setActivePage={setActivePage} />
          </>
        )}
        {activePage === "login" && <LogInPageHero onNavClick={handleNavClick} />}
        {activePage === "admin" && <AdminPage setActivePage={setActivePage} />}
        {activePage === "manage-users" && <ManageUserPage setActivePage={setActivePage} />}
        {activePage === "hidden-products" && <HiddenProductsPage setActivePage={setActivePage} />}
        {activePage === "create-account" && <CreateAccount />}
        {activePage === "shoppingCart" && (<ShoppingCartHero onNavClick={handleNavClick} setSelectedFlight={setSelectedFlight} />)}
      </main>

      <Footer />

      {/* Cookie Consent banner shown globally */}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="user_consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={30}
        onAccept={() => {
          setUserInformationFromIp();
        }}
      >
        We use cookies to improve your experience and remember your preferences. By using this site, you agree to our use of cookies.
      </CookieConsent>
    </div>
  );
}

export default App;
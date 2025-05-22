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
import { getAuthenticatedUser } from "./library/Identity/authentication"; // adjust path as needed
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
    departure: "",
    arrival: "",
    fromDate: "",
    toDate: "",
    passengers: [
      { classType: { name: "Economy" }, amount: 1 },
      { classType: { name: "Business" }, amount: 0 },
      { classType: { name: "First" }, amount: 0 }
    ]
  });
  const [activePage, setActivePage] = useState("home");
  const [pageHistory, setPageHistory] = useState([]);
  const [flights, setFlights] = useState([]);  // Store flight data
  const [user, setUser] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleGoBack = () => {
    if (pageHistory.length === 0) return;

    const previousPage = pageHistory[pageHistory.length - 1];
    setPageHistory(prev => prev.slice(0, -1));
    setActivePage(previousPage);
  };

  useEffect(() => {
    const loggedInUser = getAuthenticatedUser();
    setUser(loggedInUser);
    saveConvertionTableToLocalStorage();
  }, []);

  const navigateTo = (page) => {
    if (page !== activePage) {
      setPageHistory(prev => [...prev, activePage]);
      setActivePage(page);
    }
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
        <Navbar setActivePage={navigateTo} user={user} />
      </header>

      <main>
        {/* Landing page */}
        {activePage === "home" && (
          <>
            <HomePage setFlights={setFlights} setSelectedFlight={setSelectedFlight} setActivePage={navigateTo} searchParams={searchParams} setSearchParams={setSearchParams} />
          </>
        )}
        {/* Searched flights and deals Page */}
        {activePage === "deals" && (
          <>
            <DealsPage setFlights={setFlights} setActivePage={navigateTo} searchParams={searchParams} setSearchParams={setSearchParams} flights={flights} user={user} setSelectedFlight={setSelectedFlight} />
          </>
        )}
        {/* Details page */}
        {activePage === "flight-details" && selectedFlight && (
          <FlightDetailPage
            searchParams={searchParams}
            flight={selectedFlight}
            user={user}
            setSelectedFlight={setSelectedFlight}
            setActivePage={navigateTo}
            handleGoBack={handleGoBack}
          />
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
            <ProfilePage user={user} setSelectedFlight={setSelectedFlight} setActivePage={navigateTo} />
          </>
        )}
        {activePage === "login" && <LogInPageHero setActivePage={navigateTo} />}
        {activePage === "admin" && <AdminPage setActivePage={navigateTo} />}
        {activePage === "manage-users" && <ManageUserPage handleGoBack={handleGoBack} />}
        {activePage === "hidden-products" && <HiddenProductsPage handleGoBack={handleGoBack} />}
        {activePage === "create-account" && <CreateAccount />} {/* no navigation prop, so no change */}
        {activePage === "shoppingCart" && (
          <ShoppingCartHero setActivePage={navigateTo} setSelectedFlight={setSelectedFlight} setFlights={setFlights} flights={flights} />
        )}
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
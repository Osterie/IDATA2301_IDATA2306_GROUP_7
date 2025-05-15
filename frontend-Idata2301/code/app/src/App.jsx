import React, { useState, useEffect } from "react";
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
import { getAuthenticatedUser, checkJwtOnLoad } from "./library/Identity/authentication"; // adjust path as needed
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
      setCountryFromIP(); // Automatically sets country, airport, currency
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
        {activePage === "home" && (
          <>
            <MainPageHero setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} />
            <ProductCardHeader />
            <ProductCardContainer setFlights={setFlights} setActivePage={setActivePage}/>
          </>
        )}
        {activePage === "deals" && (
          <>
            <DealsPageHero setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} />
            <section className="search-section">
              <FilterSidebar flights={flights} setFlights={setFlights} />
              <FlightsContainer
                flights={flights}
                user={user}
                setSelectedFlight={setSelectedFlight}
                setActivePage={setActivePage}
              />
            </section>
          </>
        )}
        {activePage === "flight-details" && selectedFlight && (
          <FlightDetailPage flight={selectedFlight} />
        )}

        {activePage === "about" && <AboutUs />}
        {activePage === "login" && <LogInPageHero onNavClick={handleNavClick} />}
        {activePage === "admin" && <AdminPage setActivePage={setActivePage} />}
        {activePage === "manage-users" && <ManageUserPage />}
        {activePage === "create-account" && <CreateAccount />}
        {activePage === "settings" && <SettingsMenu user={user} />
        }
        {activePage === "shoppingCart" && (<ShoppingCartHero onNavClick={handleNavClick} />)}
        {activePage === "purchase" && <PurchaseHero />}
      </main>

      <Footer />

      {/* Cookie Consent banner shown globally */}
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
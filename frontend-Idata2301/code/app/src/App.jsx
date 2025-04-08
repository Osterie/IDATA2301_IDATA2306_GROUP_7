import React, { useState, useEffect } from "react";
import "./App.css";
import FilterSidebar from "./components/searchfilter/filter";
import ProductCardContainer from "./components/cards/deals/ProductCardContainer";
import ProductCardHeader from "./components/cards/deals/ProductCardHeader";
import NewFlightsContainer from "./components/cards/searched-flights/NewFlightsContainer";
import MainPageHero from "./components/hero/mainPageHero/MainPageHero";
import DealsPageHero from "./components/hero/dealsPageHero/DealsPageHero";
import LogInPageHero from "./components/hero/logInPageHero/LogInPageHero";
import CreateAccount from "./pages/createAccount";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import AboutUs from "./components/about/AboutUs";
// import FavoriteFlightsPage from "./components/favorite/FavoriteFlightPage";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";
import {
  hasConsent,
  setLastSearch,
  getLastSearch,
  setCountryFromIP,
} from "./utils/cookieUtils";
import LoginForm from "./components/Identity/LoginForm";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [flights, setFlights] = useState([]);  // Store flight data

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
        <Navbar onNavClick={handleNavClick} />
      </header>

      <main>
        {activePage === "home" && (
          <>
            <MainPageHero setFlights={setFlights} setActivePage={setActivePage} />
            <ProductCardHeader />
            <ProductCardContainer />
          </>
        )}
        {activePage === "deals" && (
          <>
            <DealsPageHero/>
            <section className="search-section">
              <FilterSidebar flights={flights} setFlights={setFlights} />
              <NewFlightsContainer flights={flights} />  {/* Pass flights to NewFlightsContainer */}
            </section>
          </>
        )}
        {activePage === "about" && <AboutUs />}
        {activePage === "login" && <LogInPageHero onNavClick={handleNavClick} />}
        {activePage === "create-account" && <CreateAccount />}
        {/* {activePage === "favorite" && <FavoriteFlightsPage />} */}
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

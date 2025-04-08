import React, { useState, useEffect } from "react";
import "./App.css";
import FilterSidebar from "./components/searchfilter/filter";
import ProductCardContainer from "./components/cards/deals/ProductCardContainer";
import ProductCardHeader from "./components/cards/deals/ProductCardHeader";
import NewFlightsContainer from "./components/cards/searched-flights/NewFlightsContainer";
import MainPageHero from "./components/hero/mainPageHero/MainPageHero";
import DealsPageHero from "./components/hero/dealsPageHero/DealsPageHero";
import LogInPageHero from "./components/hero/logInPageHero/LogInPageHero";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import AboutUs from "./components/about/AboutUs";
import FavoriteFlightsPage from "./components/favorite/FavoriteFlightPage";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [flights, setFlights] = useState([]);  // Store flight data

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  // Checks if user has already consented to cookies
  // If no consent: Ask
  useEffect(() => {
    const hasConsent = Cookies.get("userConsent");

    if (hasConsent) {
      // Set country from IP only if not already set
      if (!Cookies.get("country")) {
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((data) => {
            Cookies.set("country", data.country_name, { expires: 30 });
            // TODO: These seem to not work (But it may be that I dont see them)
            Cookies.set("departureAirport", data.country_code === "NO" ? "OSL" : ""); // Default for Norway
            Cookies.set("preferredCurrency", data.currency, { expires: 30 });
          });
      }
      // Restore last search if available
      const lastSearch = Cookies.get("lastSearch");
      if (lastSearch) {
        console.log("Restoring last search:", JSON.parse(lastSearch));
        // Optionally use this to prefill components
      }
    }
  }, []);

  // Save last search cookie when flights change
  useEffect(() => {
    if (flights.length > 0) {
      Cookies.set("lastSearch", JSON.stringify(flights), { expires: 7 });
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
              <FilterSidebar />
              <NewFlightsContainer flights={flights} />  {/* Pass flights to NewFlightsContainer */}
            </section>
          </>
        )}
        {activePage === "about" && <AboutUs />}
        {activePage === "login" && <LogInPageHero />}
        {activePage === "favorite" && <FavoriteFlightsPage />}
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

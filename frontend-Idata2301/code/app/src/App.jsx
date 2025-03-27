import React, { useState } from "react";
import "./App.css";
import FilterSidebar from "./components/searchfilter/filter";
import ProductCardContainer from "./components/cards/deals/ProductCardContainer";
import ProductCardHeader from "./components/cards/deals/ProductCardHeader";
import NewFlightsContainer from "./components/cards/searched-flights/NewFlightsContainer";
import MainPageHero from "./components/hero/mainPageHero/MainPageHero";
import DealsPageHero from "./components/hero/dealsPageHero/DealsPageHero";
import LogInPageHero from "./components/hero/logInPageHero/LogInPageHero";
import CreateAccountPageHero from "./components/hero/createAccountHero/CreateAccountHero";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import AboutUs from "./components/about/AboutUs";
import PassengerAmountField from "./components/searchBar/PassengerAmountField";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [flights, setFlights] = useState([]);  // Store flight data

  const handleNavClick = (page) => {
    setActivePage(page);
  };

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
      </main>

      <Footer />
    </div>
  );
}

export default App;

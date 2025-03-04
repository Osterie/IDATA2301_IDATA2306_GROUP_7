import React, { useState } from "react";
import "./App.css";
import FilterSidebar from "./components/searchfilter/filter";
import ProductCardContainer from "./components/cards/ProductCardContainer";
import ProductCardHeader from "./components/cards/ProductCardHeader";
import MainPageHero from "./components/hero/mainPageHero/MainPageHero";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";

function App() {
  const [activePage, setActivePage] = useState("home");

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
            <MainPageHero />
            <ProductCardHeader />
            <ProductCardContainer />
          </>
        )}
        {activePage === "deals" && <FilterSidebar />}
        {activePage === "about" && <h2>About Us Section</h2>}
        {activePage === "login" && <h2>Login Page</h2>}
      </main>

      <Footer />
    </div>
  );
}

export default App;

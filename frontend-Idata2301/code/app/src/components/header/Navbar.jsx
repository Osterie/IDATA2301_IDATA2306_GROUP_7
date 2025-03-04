import React, { useState } from "react";
import "./nav.css";
import logo from "./images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
      </div>

      <a href="/" className="logo">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h1>Flight Finder</h1>
        </div>
      </a>

      <ul className={isMenuOpen ? "active" : ""}>
        <li><a className="active" href="#">Home</a></li>
        <li><a href="/info">Deals</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/logg">Logg in</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

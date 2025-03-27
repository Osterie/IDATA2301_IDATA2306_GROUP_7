import React, { useState } from "react";
import "./nav.css";
import logo from "./images/logo3.png";

const Navbar = ({ onNavClick }) => {
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
        <li><a href="#" onClick={() => onNavClick("home")}>Home</a></li>
        <li><a href="#" onClick={() => onNavClick("deals")}>Deals</a></li>
        <li><a href="#" onClick={() => onNavClick("about")}>About</a></li>
        <li><a href="#" onClick={() => onNavClick("login")}>Log in</a></li>
        <li><a href="#" onClick={() => onNavClick("heart")}>💖</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

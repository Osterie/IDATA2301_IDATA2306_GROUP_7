import React, { useState } from "react";
import { doLogout } from "../../library/Identity/authentication"; // adjust path
import "./nav.css";
import logo from "./images/logo3.png";
import { isAdmin } from "../../library/Identity/authentication"; // adjust path

const Navbar = ({ onNavClick, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showAdmin = user && isAdmin(user);

  console.log(user);

  return (
    <nav>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
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
          
        {/* Conditionally show Log In or Log Out */}
          {user ? (
          <>
            <li><a href="#" className="log-out-button" onClick={doLogout}>Log Out</a></li>
          </>
        ) : (
          <li><a href="#" onClick={() => onNavClick("login")}>Log In</a></li>
        )}

        {showAdmin && (
          <li><a href="#" onClick={() => onNavClick("admin")}>Admin</a></li>
        )}

        <li><a href="#" onClick={() => onNavClick("settings")}>⚙️</a></li>
        <li><a href="#" onClick={() => onNavClick("shoppingCart")}>🛒</a></li>

      </ul>
    </nav>
  );
};

export default Navbar;

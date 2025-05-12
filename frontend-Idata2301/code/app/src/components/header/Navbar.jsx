import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, isAdmin } from "../../library/Identity/authentication";
import "./nav.css";
import logo from "./images/logo3.png";

const Navbar = ({ onNavClick, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showAdmin = user && isAdmin(user);

  const handleLogout = () => {
    doLogout();
    navigate("/");
  };

  return (
    <nav>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
      </div>

      <Link to="/" className="logo">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h1>Flight Finder</h1>
        </div>
      </Link>

      <ul className={isMenuOpen ? "active" : ""}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/deals">Deals</Link></li>
        <li><Link to="/about">About</Link></li>

        {user ? (
          <>
            <li><a href="#" className="log-out-button" onClick={handleLogout}>Log Out</a></li>
          </>
        ) : (
          <li><Link to="/login">Log In</Link></li>
        )}

        {showAdmin && (
          <li><Link to="/admin">Admin</Link></li>
        )}

        <li><Link to="/settings">⚙️</Link></li>
        <li><Link to="/shoppingCart">🛒</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

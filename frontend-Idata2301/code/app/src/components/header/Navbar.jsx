import React from "react";
import "./nav.css";

const Navbar = () => {
  return (
    // <header>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo"></label>
        <ul>
          <li><a className="active" href="#">Home</a></li>
          <li><a href="/info">Deals</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/logg">Logg in</a></li>
        </ul>
      </nav>
    
  );
};

export default Navbar;
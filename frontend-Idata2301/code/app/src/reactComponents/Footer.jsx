import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="section4">
      <div id="footerContent">
        <div id="bottomTopBox"></div>
        <div id="contact">
          <div id="contactTitle">Info</div>
          <div className="contactInfo">
            Mail: &nbsp;<a href="mailto:airvibe@air.com">airvibe@air.com</a>
          </div>
        </div>
        <div id="bottomBox">© AirVibe 2025</div>
      </div>
    </footer>
);
};

export default Footer;
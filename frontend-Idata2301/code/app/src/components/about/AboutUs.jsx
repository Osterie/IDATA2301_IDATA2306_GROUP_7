import React from "react";
import "./aboutUs.css";
import RoleContainer from "./RoleContainer";

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <header>
        <h1>About Us</h1>
      </header>

      <section className="about-us-info-container">
        <article>
          <h2>Address</h2>
          <address>
            Skyscanner Limited<br />
            Quartermile One<br />
            15 Lauriston Place<br />
            Edinburgh EH3 9EN<br />
            United Kingdom
          </address>
        </article>

        <article>
          <h2>Offices</h2>
          <p>United Kingdom, Singapore, Spain, China, USA, Japan, India</p>
        </article>

        <article>
          <h2>Company Registration Number</h2>
          <p>04217916</p>
        </article>

        <article>
          <h2>VAT Registration Number</h2>
          <p>GB 208148618</p>
        </article>

        <article>
          <h2>Registered Office</h2>
          <address>
            Skyscanner Limited<br />
            Level 5, Ilona Rose House<br />
            Manette Street<br />
            London W1D 4AL<br />
            United Kingdom
          </address>
        </article>
      </section>

      <section>
        <RoleContainer />
      </section>

      <section className="about-us-text-container">
        <article>
          <h2>Welcome to Flight Finder</h2>
          <p>
            Welcome to Flight Finder, where your journey into the skies begins with the perfect flight option tailored to your needs. At Flight Finder, we've transformed the flight booking experience by aggregating real-time prices and schedules from a plethora of trusted airline partners. No more endless tab-switching to hunt down the best deal – our platform brings all the information to you in a single, streamlined experience.
          </p>
          <p>
            Our commitment goes beyond simply offering a vast array of flight options; we are dedicated to ensuring transparency, efficiency, and an exhilarating booking experience. Our user-friendly interface allows you to effortlessly compare flights, ensuring you find the perfect match for your travel preferences and budget. Farewell to hidden fees and complex booking procedures – welcome to a smooth flight booking journey.
          </p>
          <p>
            Flight Finder is not just about finding flights; it's about commencing your travel adventure on the right note. Our platform is designed to infuse a sense of excitement into the planning process. From last-minute getaways to well-planned business trips, we ensure you have all the choices at your fingertips. Our services are designed to bring you closer to the world, one flight at a time.
          </p>
          <p>
            Join Flight Finder and elevate your travel planning to new heights. Whether you're chasing the Northern Lights, jetting off to a tropical paradise, or heading to a bustling city for a conference, every flight booked with us is a promise of discovery and reliability. With Flight Finder, embark on every journey with confidence and let your travel aspirations take flight.
          </p>
        </article>
      </section>
    </section>
  );
};

export default AboutUs;

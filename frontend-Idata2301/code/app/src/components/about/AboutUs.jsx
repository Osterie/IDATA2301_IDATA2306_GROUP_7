import "./aboutUs.css";
import RoleContainer from "./RoleContainer";

const AboutUs = () => {
  return (
    <main className="about-us-section">
      <header>
        <h1>About Us</h1>
        <p>Your gateway to smarter flight booking</p>
      </header>

      <section className="about-us-info-container">
        <div className="about-card">
          <h2>Address</h2>
          <address>
            Skyscanner Limited<br />
            Quartermile One<br />
            15 Lauriston Place<br />
            Edinburgh EH3 9EN<br />
            United Kingdom
          </address>
        </div>

        <div className="about-card">
          <h2>Offices</h2>
          <p>UK, Singapore, Spain, China, USA, Japan, India</p>
        </div>

        <div className="about-card">
          <h2>Company Reg. Number</h2>
          <p>04217916</p>
        </div>

        <div className="about-card">
          <h2>VAT Number</h2>
          <p>GB 208148618</p>
        </div>

        <div className="about-card">
          <h2>Registered Office</h2>
          <address>
            Skyscanner Limited<br />
            Level 5, Ilona Rose House<br />
            Manette Street<br />
            London W1D 4AL<br />
            United Kingdom
          </address>
        </div>
      </section>

      <section>
        <RoleContainer />
      </section>

      <section className="about-us-text-container">
        <h2>Welcome to Flight Finder</h2>
        <p>
          At <em>Flight Finder</em>, your journey into the skies begins with the perfect flight option tailored to your needs. We’ve revolutionized the booking experience by aggregating real-time data from trusted airline partners.
        </p>
        <p>
          Say goodbye to <em>endless tab-switching</em>—our platform delivers everything in one clean, intuitive interface.
        </p>
        <p>
          Transparency, efficiency, and ease-of-use are at our core. Whether you're planning a last-minute getaway or a business trip, <em>Flight Finder</em> ensures the experience is seamless and inspiring.
        </p>
        <p>
          Every flight you book is the start of a new adventure—one filled with <em>confidence</em>, <em>clarity</em>, and <em>curiosity</em>. Let’s fly smarter, together.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;

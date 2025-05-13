import "./footer.css";

const Footer = () => {
  return (
    <footer className="section4">
      <div id="footerContent">
        {/* Decorative or structural content can remain div */}
        <div id="bottomTopBox" aria-hidden="true"></div>

        <section id="contact" aria-labelledby="contactTitle">
          <h2 id="contactTitle">Info</h2>
          <address className="contactInfo">
            Mail: &nbsp;
            <a href="mailto:flightfindercustomerservice@gmail.com">
              flightfindercustomerservice@gmail.com
            </a>
          </address>
        </section>

        <article className="footer-about">
          <p>
            This website is a result of a university group project, performed in the course <a href="https://www.ntnu.no/studier/emner/IDATA2301#tab=omEmnet">IDATA2301 
            Web technologies</a>, at <a href="https://www.ntnu.no">NTNU</a>. All the information provided here is a result of imagination. 
            Any resemblance with real companies or products is a coincidence.  
          </p>
        </article>

        <div id="bottomBox">© Flight Finder 2025</div>
      </div>
    </footer>
  );
};

export default Footer;

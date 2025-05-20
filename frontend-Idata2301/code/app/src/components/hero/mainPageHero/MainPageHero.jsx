import './mainPageHero.css';
import SearchBar from '../../searchBar/SearchBar';

const MainPageHero = ({ setFlights, setActivePage, searchParams, setSearchParams }) => {
  return (
    // Main hero section for flight search
    <section className="hero" aria-label="Flight search section">

      {/* Background image layer (purely visual) */}
      <div className="hero-background" aria-hidden="true" />

      {/* Dark overlay to improve text readability over image */}
      <div className="hero-overlay" aria-hidden="true" />
      
      {/* Foreground content (text and search bar) */}
      <div className="hero-content">
        <header className="hero-header">
          <h1>Find your next adventure</h1>
          <p>Search for the best deals on flights all around the world</p>
        </header>
        <SearchBar setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} />
      </div>
    </section>
  );
};

export default MainPageHero;

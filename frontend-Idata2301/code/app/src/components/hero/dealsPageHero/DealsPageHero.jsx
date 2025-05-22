import './dealsPageHero.css';
import SearchBar from '../../searchBar/SearchBar';

const DealsPageHero = ({ setFlights, setActivePage, searchParams, setSearchParams }) => {
  return (
    <section className="deals-hero">
      <div className="deals-hero-container">
        <SearchBar setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} />
      </div>
    </section>
  );
};

export default DealsPageHero;

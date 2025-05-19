import FilterSidebar from "../components/searchfilter/filter";
import FlightsContainer from "../components/cards/searchedFlights/FlightsContainer";
import DealsPageHero from "../components/hero/dealsPageHero/DealsPageHero";

function DealsPage({setFlights, setActivePage, searchParams, setSearchParams, flights, user, setSelectedFlight}) {

  return (
    <>
        <DealsPageHero setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} />
        <section className="search-section">
            <FilterSidebar flights={flights} setFlights={setFlights} />
            <FlightsContainer
            flights={flights}
            user={user}
            setSelectedFlight={setSelectedFlight}
            setActivePage={setActivePage}
            />
        </section>
    </>
  );
}

export default DealsPage;
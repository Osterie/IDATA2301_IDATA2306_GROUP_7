import MainPageHero from "../components/hero/mainPageHero/MainPageHero";
import ProductCardContainer from "../components/cards/frontPageCards/ProductCardContainer";
import ProductCardHeader from "../components/cards/frontPageCards/ProductCardHeader";

function HomePage({setFlights, setActivePage, searchParams, setSearchParams}) {

  return (
    <>
        <MainPageHero setFlights={setFlights} setActivePage={setActivePage} searchParams={searchParams} setSearchParams={setSearchParams} />
        <ProductCardHeader />
        <ProductCardContainer setFlights={setFlights} setActivePage={setActivePage}/>
    </>
  );
}

export default HomePage;

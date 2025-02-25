import './App.css';
import FilterSidebar from './components/searchfilter/filter';
import ProductCardContainer from './components/cards/ProductCardContainer';
import MainPageHero from './components/hero/mainPageHero/MainPageHero';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';

function App() {
  return (
    <div className="App">

    <header className="App-header">
      <Navbar /> {/* Navbar component */}
    </header>

      <main>
        {/* <MainPageHero/>  */}
        <FilterSidebar />
        <ProductCardContainer />
      </main>

      <Footer />

    </div>
  );
}

export default App;

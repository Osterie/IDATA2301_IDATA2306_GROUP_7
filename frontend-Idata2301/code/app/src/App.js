import './App.css';
import FilterSidebar from './components/searchfilter/filter';
import ProductCardContainer from './components/cards/ProductCardContainer';
import MainPageHero from './components/hero/mainPageHero/MainPageHero';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';

// Used to fetch data from backend
import { useEffect, useState } from "react";

function testApi (){
  

      fetch('URL')
    .then(response => response.text())  // Change from .json() to .text()
    .then(data => console.log(data));    // Now it correctly logs "Hei, Verden!!"


};

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/message")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">

    <header className="App-header">
      <Navbar /> {/* Navbar component */}
    </header>

      <main>

        <button onClick={() => testApi()}>Click me</button>
        <p>{message}</p>
        <MainPageHero/> 
        <FilterSidebar />
        <ProductCardContainer />
      </main>

      <Footer />

    </div>
  );
}

export default App;

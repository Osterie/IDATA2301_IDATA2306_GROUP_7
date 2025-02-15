import './App.css';
import FilterSidebar from './components/searchfilter/filter';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <main>
        <FilterSidebar /> {/* FilterSidebar component */}
      </main>

    </div>
  );
}

export default App;

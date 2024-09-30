import React, { useState } from 'react';
import './App.css';
import back_vid from '/src/assets/back_vid.mp4';
import MultiChartDashboard from './MultiChartDashboard';

const Stocks = () => {
  debugger
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false); // New state to track search click

  // Handle changes in the input field
  const handleSymbolChange = (e) => {
    debugger
    setSymbol(e.target.value);
    setSearchInitiated(false); // Reset search initiation when symbol changes
  };

  // Trigger search
  const handleSearchClick = () => {
    if (!symbol) {
      setError("Please enter a symbol");
      return;
    }
    setError(""); // Clear previous errors
    setSearchInitiated(true); // Set search as initiated after button click
  };

  return (
    <div className="stocks-page">
      <video className="background-video" autoPlay muted loop>
        <source src={back_vid} type="video/mp4" />
      </video>
      <div className="stocks-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search stocks..."
            value={symbol}
            onChange={handleSymbolChange}
            aria-label="Stock Symbol Input"
          />
          <button onClick={handleSearchClick} aria-label="Search Stocks">Search</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        
        {/* Render MultiChartDashboard if a search has been initiated */}
        {searchInitiated && <MultiChartDashboard symbol={symbol} />}
      </div>
    </div>
  );
};

export default Stocks;

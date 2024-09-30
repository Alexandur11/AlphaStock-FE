import React, { useState } from 'react';
import './Stocks.css';
import back_vid from '/src/assets/back_vid.mp4';
import MultiChartDashboard from './MultiChartDashboard';

const Stocks = () => {
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");

  // Handle changes in the input field
  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  // Trigger search
  const handleSearchClick = () => {
    if (!symbol) {
      setError("Please enter a symbol");
      return;
    }
    setError(""); // Clear previous errors
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
            aria-label="Stock Symbol Input" // Accessibility improvement
          />
          <button onClick={handleSearchClick} aria-label="Search Stocks">Search</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        
        {/* Render MultiChartDashboard if a symbol is entered */}
        {symbol && <MultiChartDashboard symbol={symbol} />}
      </div>
    </div>
  );
};

export default Stocks;

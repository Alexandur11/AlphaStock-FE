import React, { useState } from 'react';
import axios from 'axios';
import './Stocks.css';
import back_vid from '/src/assets/back_vid.mp4';
import { alpha_stock_service, prepareTokenForRequest } from '../../../utils'; 
import AlphaVantageNewsletter from '../Newsletter/AlphaVantageNewsletter';


const Stocks = () => {
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [chartImageUrl, setChartImageUrl] = useState(""); 
  

  const fetchStockData = async () => {
    if (!symbol) {
      setError("Please enter a symbol");
      setChartImageUrl(""); // Clear image URL
      return;
    }

    try {
      // Fetch the chart image
      const access_token = await prepareTokenForRequest()

      const imageResponse = await fetch(`${alpha_stock_service}/company/information?symbol=${symbol}`, 
        {method: 'GET',headers: {Authorization: `Bearer ${access_token}`}});

      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setChartImageUrl(imageUrl);
        setError("");
      } else {
        throw new Error("Failed to fetch chart image");
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to fetch data');
      setChartImageUrl(""); // Clear image URL
    }
  };

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleSearchClick = () => {
    fetchStockData();
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
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {chartImageUrl && (
          <div className="content">
            <div className="chart-frame">
              <img src={chartImageUrl} alt="Stock Chart" />
            </div>
            <div className="newsletters">
            <AlphaVantageNewsletter symbol={symbol} />
              <div className="newsletter">Newsletter 2</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stocks;

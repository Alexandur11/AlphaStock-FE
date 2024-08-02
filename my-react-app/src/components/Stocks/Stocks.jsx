import React, { useState } from 'react';
import axios from 'axios';
import './Stocks.css';
import back_vid from '/src/assets/back_vid.mp4';
import { backend_url } from '../../../utils'; 

const Stocks = () => {
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [chartImageUrl, setChartImageUrl] = useState(""); // State for image URL
  const token = localStorage.getItem('token')?.replace(/^"|"$/g, '');

  const fetchStockData = async () => {
    if (!symbol) {
      setError("Please enter a symbol");
      setChartImageUrl(""); // Clear image URL
      return;
    }

    try {
      // Fetch the chart image
      const imageResponse = await fetch(`${backend_url}/company/information?symbol=${symbol}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        Your browser does not support HTML5 video.
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
              <div className="newsletter">Newsletter 1</div>
              <div className="newsletter">Newsletter 2</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stocks;

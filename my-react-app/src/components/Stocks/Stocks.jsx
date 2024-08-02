import React, { useState } from 'react';
import './Stocks.css';
import back_vid from '/src/assets/back_vid.mp4';
import { backend_url } from '../../../utils'; 

const Stocks = () => {
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const token = localStorage.getItem('token')?.replace(/^"|"$/g, '');

  const fetchStockData = async () => {
    if (!symbol) {
      setError("Please enter a symbol");
      setResult(null);
      return;
    }

    try {
      const response = await fetch(`${backend_url}/company/information?symbol=${symbol}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        // Transform data into an array of objects
        const transformedResult = result.map((item) => ({
          symbol: item[0],
          year: item[1],
          revenue: item[2],
          netIncome: item[3],
          cashFlow: item[4],
          debtLevel: item[5],
          eps: item[6],
          roe: item[7],
        }));
        setResult(transformedResult); 
        setError("");
      } else {
        setError("Failed to fetch data");
        setResult(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data');
      setResult(null);
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
        {result && result.length > 0 ? (
          <div className="content">
            <div className="data-frame">
              {result.map((item, index) => (
                <div key={index} className="data-row">
                  <p><strong>Symbol:</strong> {item.symbol}</p>
                  <p><strong>Year:</strong> {item.year}</p>
                  <p><strong>Revenue:</strong> {item.revenue}</p>
                  <p><strong>Net Income:</strong> {item.netIncome}</p>
                  <p><strong>Cash Flow:</strong> {item.cashFlow}</p>
                  <p><strong>Debt Level:</strong> {item.debtLevel}</p>
                  <p><strong>EPS:</strong> {item.eps}</p>
                  <p><strong>ROE:</strong> {item.roe}</p>
                </div>
              ))}
            </div>
            <div className="newsletters">
              <div className="newsletter">Newsletter 1</div>
              <div className="newsletter">Newsletter 2</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Stocks;

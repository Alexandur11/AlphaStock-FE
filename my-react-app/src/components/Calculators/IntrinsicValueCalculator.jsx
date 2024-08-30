import React, { useState } from 'react';
import './Calculators.css';
import back_vid from '/src/assets/back_vid.mp4';
import { alpha_stock_service } from '../../../utils'; 

const IntrinsicValueCalculator = () => {
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stock) {
      setError("Symbol is required!");
      return;
    }

    setError("");
    try {
      const access_token = await prepareTokenForRequest()
      const intrinsicResponse = await fetch(`${alpha_stock_service}/stock_calculator/Intrinsic_value?symbol${stock}`, 
        {method: 'GET',headers: {Authorization: `Bearer ${access_token}`,},});

      const intrinsicResult = await intrinsicResponse.json();



  

      if (response.ok) {
        setResult(result); 
      } else {
        setError("Calculation failed");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Calculation failed');
    }
  };

  return (
    <div className="Calculators">
      <video className="background-video" autoPlay loop muted>
        <source src={back_vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main>
        <div className="calculator">
          <h2>Intrinsic Value Calculation</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="stockName">Stock Name:</label>
              <input
                type="text"
                id="stockName"
                name="stockName"
                value={stock}
                onChange={handleStockChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit">Calculate</button>
              <button type="button" className="info-button">Info</button>
            </div>
            {error && <div className="error">{error}</div>}
            {result && (
              <div id="result" className="result">
                {JSON.stringify(result)}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default IntrinsicValueCalculator;
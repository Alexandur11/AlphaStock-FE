import React, { useState } from 'react';
import './Calculators.css';
import back_vid from '/src/assets/back_vid.mp4';
import { login_service } from '../../../utils'; 

const StockPredictor = () => {
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
    let token = localStorage.getItem('token');
    token = token?.replace(/^"|"$/g, '');

    try {
      const response = await fetch(`${login_service}/ML_services/future_price?symbol=${stock}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data); 
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
          <h2>Stock Predictor</h2>
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
              <button type="submit">Predict</button>
            </div>
            {error && <div className="error">{error}</div>}
            {result && (
              <div id="result" className="result">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default StockPredictor;
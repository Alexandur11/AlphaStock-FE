import React from 'react';
import './Calculators.css';
import back_vid from '/src/assets/back_vid.mp4';

const StockPredictor = () => {
  return (
    <div className="Calculators">
      <video className="background-video" autoPlay loop muted>
        <source src={back_vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <header>
        <h1>Stock Predictor</h1>
        <p></p>
      </header>

      <main>
        <div className="calculator">
          <h2>Stock Predictor</h2>
          <form>
            <div className="form-group">
              <label htmlFor="stockName">Stock Name:</label>
              <input type="text" id="stockName" name="stockName" />
            </div>
            <div className="form-actions">
              <button type="submit">Predict</button>
              <button type="button" className="info-button">Info</button>
            </div>
            <div id="result" className="result">
              {/* Calculation result will be displayed here */}
            </div>
          </form>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StockPredictor;

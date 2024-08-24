import React, { useState } from 'react';
import './Calculators.css';
import back_vid from '/src/assets/back_vid.mp4';
import { login_service, evaluateStockValue } from '../../../utils';

const PeterLynchCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [EGR, setEGR] = useState("");
  const [DY, setDY] = useState("");
  const [peRatio, setPeRatio] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState("");


  const handleStockSymbolChange = (e) => {
    setStockSymbol(e.target.value.toUpperCase());
  };

  const handleEGRChange = (e) => {
    setEGR(e.target.value);
  };

  const handleDYChange = (e) => {
    setDY(e.target.value);
  };

  const handlePeRatioChange = (e) => {
    setPeRatio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EGR) {
      setError("EGR is required!");
      return;
    }
    if (!DY) {
      setError("Dividend Yield is required!");
      return;
    }
    if (!peRatio) {
      setError("P/E Ratio is required!");
      return;
    }

    setError("");
    let token = localStorage.getItem('token');
    token = token.replace(/^"|"$/g, '');

    try {
      const response = await fetch(`${login_service}/stock_calculator/peter_lynch_fair_price?egr=${EGR}&dy=${DY}&pe_ratio=${peRatio}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      const resultValue = parseFloat(result); 

      if (response.ok) {
        const evaluation = await  evaluateStockValue(resultValue); 
        setEvaluationResult(evaluation); 
      } else {
        setError("Calculation failed");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Calculation failed');
    }
  };

  const handleTrailingPeInfoClick = (field) => {
    const width = 600;
    const height = 400;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    window.open(`https://finance.yahoo.com/quote/${stockSymbol}/`, 'popup', `width=${width},height=${height},top=${top},left=${left}`);
  };

  const handleEGRInfoClick = (field) => {
    const width = 600;
    const height = 400;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    window.open(`https://finance.yahoo.com/quote/${stockSymbol}/analysis/`, 'popup', `width=${width},height=${height},top=${top},left=${left}`);
  };

  const handleDYInfoClick = (field) => {
    const width = 600;
    const height = 400;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    window.open(`https://finance.yahoo.com/quote/${stockSymbol}/key-statistics/`, 'popup', `width=${width},height=${height},top=${top},left=${left}`);
  };

  return (
    <div className="Calculators">
      <video className="background-video" autoPlay loop muted>
        <source src={back_vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main>
        <div className="calculator">
          <h2>Peter Lynch Fair Value Calcuator</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="stockSymbol">Stock Symbol:</label>
              <input
                type="text"
                id="stockSymbol"
                name="stockSymbol"
                value={stockSymbol}
                onChange={handleStockSymbolChange}
                placeholder="Fill if the below is unknown"
              />
            </div>
            <div className="form-group">
              <label htmlFor="EGR">EGR (Earnings Growth Rate %):</label>
              <input
                type="number"
                id="EGR"
                name="EGR"
                value={EGR}
                onChange={handleEGRChange}
              />
              {stockSymbol && (
                <button type="button" className="info-button" onClick={() => handleEGRInfoClick('EGR')}>
                  View future 5 years EGR
                </button>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="DY">Dividend Yield (%):</label>
              <input
                type="number"
                id="DY"
                name="DY"
                value={DY}
                onChange={handleDYChange}
              />
              {stockSymbol && (
                <button type="button" className="info-button" onClick={() => handleDYInfoClick('DY')}>
                  View Dividend Yield Info
                </button>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="peRatio">P/E Ratio:</label>
              <input
                type="number"
                id="peRatio"
                name="peRatio"
                value={peRatio}
                onChange={handlePeRatioChange}
              />
              {stockSymbol && (
                <button type="button" className="info-button" onClick={() => handleTrailingPeInfoClick('peRatio')}>
                  View P/e Ratio
                </button>
              )}
            </div>
            <div className="form-actions">
              <button type="submit">Calculate</button>
            </div>
            {error && <div className="error">{error}</div>}
            {evaluationResult && (
              <div id="result" className="result">
                {evaluationResult} {/* Display the evaluated result */}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default PeterLynchCalculator;

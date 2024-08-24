import React, { useState } from 'react';
import './Calculators.css';
import back_vid from '/src/assets/back_vid.mp4';
import { alpha_stock_service, evaluateStockValue, prepareTokenForRequest } from '../../../utils';

const PeterLynchCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [eargnigsPerShareGrowthRate, setEargnigsPerShareGrowthRate] = useState("");
  const [dividendYield, setDividendYield] = useState("");
  const [priceToEarningsRatio, setPriceToEarningsRatio] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState("");


  const handleStockSymbolChange = (e) => {
    setStockSymbol(e.target.value.toUpperCase());
  };

  const handleEGRChange = (e) => {
    setEargnigsPerShareGrowthRate(e.target.value);
  };

  const handleDYChange = (e) => {
    setDividendYield(e.target.value);
  };

  const handlePeRatioChange = (e) => {
    setPriceToEarningsRatio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eargnigsPerShareGrowthRate) {
      setError("EGR is required!");
      return;
    }
    if (!dividendYield) {
      setError("Dividend Yield is required!");
      return;
    }
    if (!priceToEarningsRatio) {
      setError("P/E Ratio is required!");
      return;
    }

    setError("");
    

    try {
      const access_token = await prepareTokenForRequest()
      const response = await fetch(`${alpha_stock_service}/stock_calculator/peter_lynch_fair_price`, 
        {method: 'GET',headers: {Authorization: `Bearer ${access_token}`,},});

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
                value={eargnigsPerShareGrowthRate}
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
                value={dividendYield}
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
                value={priceToEarningsRatio}
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

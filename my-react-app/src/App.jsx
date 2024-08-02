import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Calculators from './components/Calculators/Calculators';
import Stocks from './components/Stocks/Stocks';
import Login from './components/Auth/Login';
import PeterLynchCalculator from './components/Calculators/PeterLynchCalculator';
import IntrinsicValueCalculator from './components/Calculators/IntrinsicValueCalculator';
import StockPredictor from './components/Calculators/MLStockPrediction';



function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/PLC" element={<PeterLynchCalculator />} />
          <Route path="/IVC" element={<IntrinsicValueCalculator />} />
          <Route path="/SPP" element={<StockPredictor />} />
        </Routes>
      </Router>
  );
}

export default App;

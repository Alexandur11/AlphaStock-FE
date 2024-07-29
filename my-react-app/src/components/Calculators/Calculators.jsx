import React from 'react';
import PeterLynchCalculator from './PeterLynchCalculator';
import MLStockPredictionsCalculator from './MLStockPrediction';
import IntrinsicValueCalculator from './IntrinsicValueCalculator';
import back_vid from '/src/assets/back_vid.mp4'; // Path to your video file

const Calculators = () => {
  return (
    <div className="Calculators">
      <video autoPlay muted loop className="background-video">
        <source src={back_vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header>
        <h1>Welcome to Calculators</h1>
        <p>Choose a calculator and get started</p>
        </header>
      <main>
        <section className="calculator">
          <h2>Intrinsic Value Calculator</h2>
          <IntrinsicValueCalculator />
        </section>
        <section className="calculator">
          <h2>ML Calculator for Stock Predictions</h2>
          <MLStockPredictionsCalculator />
        </section>
        <section className="calculator">
          <h2>Peter Lynch Calculator</h2>
          <PeterLynchCalculator />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Calculators Inc.</p>
      </footer>
    </div>
  );
};

export default Calculators;


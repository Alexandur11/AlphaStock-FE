// src/components/HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AlphaStock</h1>
          <p>Your go-to platform for financial analysis and insights.</p>
          <a href="#features" className="cta-button">Get Started</a>
        </div>
      </header>
      <section id="features" className="features-section">
        <div className="features-content">
          <h2>Features</h2>
          <div className="feature">
            <h3>Real-time Data</h3>
            <p>Get the latest market data and trends at your fingertips.</p>
          </div>
          <div className="feature">
            <h3>Advanced Analytics</h3>
            <p>Analyze financial metrics with powerful tools and visualizations.</p>
          </div>
          <div className="feature">
            <h3>Custom Alerts</h3>
            <p>Set up alerts to stay informed about important market movements.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 AlphaStock. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

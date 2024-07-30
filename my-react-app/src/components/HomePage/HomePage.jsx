import React, { useState, useContext } from 'react';
import './HomePage.css';
import back_vid from '/src/assets/back_vid.mp4'; // Path to your video file


const HomePage = () => {
  return (
    <div className="homepage">
      <video autoPlay muted loop className="background-video">
        <source src={back_vid} type="video/mp4" />
      </video>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Website</h1>
          <p>Discover amazing content and features.</p>
          <a href="#features" className="cta-button">Learn More</a>
        </div>
      </div>

    </div>
  );
};

export default HomePage;

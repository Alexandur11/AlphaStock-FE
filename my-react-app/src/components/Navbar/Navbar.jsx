// src/components/NavigationBar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">AlphaStock</a>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#Stocks">Stocks</a></li>
          <li><a href="#Calculators">Calculators</a></li>
          <li><a href="#Profile">Profile</a></li>
        </ul>
        <div className="navbar-toggle">
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

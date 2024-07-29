import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">AlphaStock</a>
        <ul className="navbar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/Stocks">Stocks</a></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" onClick={handleDropdownToggle}>Calculators</a>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/calculator1">Fair Value Calculator</Link></li>
                <li><Link to="/calculator2">Intrinsic Value Calculator</Link></li>
                <li><Link to="/calculator3">Stock Price Predictor</Link></li>
              </ul>
            )}
          </li>
          <li><a href="#Profile">Profile</a></li>
          <li><a href="/Login">Login</a></li>
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

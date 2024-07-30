import React, { useState } from 'react'; 
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../../utils'; // Import the utility function

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const role = userRole ? JSON.parse(userRole) : null;


  const handleDropdownToggle = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">AlphaStock</a>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/stocks">Stocks</Link></li>
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
          <li><Link to="#profile">Profile</Link></li>
          {role !== null && (<li><a href="#" onClick={handleLogout} className="navbar-link">Logout</a></li>)}
          {role == null && (<li><a href="/login" className="navbar-link">Login</a></li>)}
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

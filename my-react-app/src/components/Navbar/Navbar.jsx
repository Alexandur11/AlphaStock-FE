import React, { useState } from 'react'; 
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../../utils'; // Import the utility function
import Cookies from "js-cookie";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const refreshToken = Cookies.get('refresh_token');

  const handleDropdownToggle = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">AlphaStock</a>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          {refreshToken !== undefined && <li><Link to="/stocks">Stocks</Link></li>}
          {refreshToken !== undefined && <li className="dropdown">
            <a href="#" className="dropdown-toggle" onClick={handleDropdownToggle}>Calculators</a>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/PLC">FVC</Link></li>
                <li><Link to="/IVC">IVC</Link></li>
                <li><Link to="/SPP">SPP</Link></li>
              </ul>
            )}
          </li>}
          {refreshToken !== undefined && (<li><a href="/" onClick={handleLogout} className="navbar-link">Logout</a></li>)}
          {refreshToken == undefined && (<li><a href="/login" className="navbar-link">Login</a></li>)}
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

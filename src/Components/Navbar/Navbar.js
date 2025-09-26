import React from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';   // ✅ keep it

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">StayHealthy</h1>
        <img 
          src="https://w7.pngwing.com/pngs/306/115/png-transparent-physician-dentistry-clinic-medicine-health-blue-hand-logo.png" 
          alt="Logo" 
          className="navbar-logo-img" 
        />
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/blog">Health Blog</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>

      <div className="navbar-buttons">
        <Link to="/signup" className="btn signup">Sign up</Link>
        <Link to="/login" className="btn login">Log in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
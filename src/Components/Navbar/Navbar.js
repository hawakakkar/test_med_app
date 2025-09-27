import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  // check token + extract email before '@'
  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    setIsLoggedIn(!!token);

    const email = sessionStorage.getItem('email');
    if (email) {
      setUserName(email.split('@')[0]); // take part before '@'
    }
  }, []);

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
        {isLoggedIn ? (
          <>
            {/* ✅ Welcome message */}
            <span className="navbar-user">Welcome, {userName}</span>
            <button className="btn logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn signup">Sign up</Link>
            <Link to="/login" className="btn login">Log in</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
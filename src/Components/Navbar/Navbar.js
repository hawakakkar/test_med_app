import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showProfileCard, setShowProfileCard] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    setIsLoggedIn(!!token);

    // Prefer a stored full name (e.g. "Kkr Hawa") if available,
    // otherwise fall back to the part before the @ of the email.
    const storedName = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");

    if (storedName) {
      setUserName(storedName);
    } else if (email) {
      setUserName(email.split("@")[0]);
    } else {
      setUserName("");
    }
  }, []);

  const handleProfileClick = () => {
    setShowProfileCard(!showProfileCard);
  };

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
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li>
          <Link to="/blog">Health Blog</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
      </ul>

      <div className="navbar-buttons">
        {isLoggedIn ? (
          <div className="user-section">
            <span className="navbar-user" onClick={handleProfileClick}>
              Welcome, {userName} ▼
            </span>
            <button onClick={handleLogout} className="btn logout">
              Logout
            </button>

            {showProfileCard && (
              <div className="profile-popup" onMouseLeave={() => setShowProfileCard(false)}>
                {/* Pass username/email as props as fallback while fetch runs */}
                <ProfileCard username={userName} email={sessionStorage.getItem("email") || ""} />

            
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="btn signup">
              Sign up
            </Link>
            <Link to="/login" className="btn login">
              Log in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
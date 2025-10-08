import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // ✅ for showing ProfileCard inside box

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    setIsLoggedIn(!!token);

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

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
    setShowProfile(false); // hide profile form when reopening dropdown
  };

  const handleProfileClick = () => {
    setShowProfile(true); // ✅ show ProfileCard inside same box
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/blog">Health Blog</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>

      <div className="navbar-buttons">
        {isLoggedIn ? (
          <div className="user-section">
            <span className="navbar-user" onClick={handleDropdownToggle}>
              Welcome, {userName} ▼
            </span>
            <button onClick={handleLogout} className="btn logout">
              Logout
            </button>

            {/* ✅ Single dropdown box */}
            {showDropdown && (
              <div className="profile-popup" onMouseLeave={() => setShowDropdown(false)}>
                <div className="profile-box">
                  {!showProfile ? (
                    <>
                      <p className="profile-item" onClick={handleProfileClick}>
                        Your Profile
                      </p>
                      <Link
                        to="/reports"
                        className="profile-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        Your Reports
                      </Link>
                    </>
                  ) : (
                    <ProfileCard />
                  )}
                </div>
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
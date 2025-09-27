import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // if already logged in, go home
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // *** here you’d normally call your API ***
    // for now simulate successful login:
    sessionStorage.setItem("auth-token", "dummy_token_here");
    sessionStorage.setItem("email", email);

    alert("Login successful!");

    // redirect to home and reload so Navbar updates
    navigate("/");
    window.location.reload();
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };
return (
    <div className="login-container">
      <h2>Login</h2>
      <p>
        Are you a new member?{" "}
        <Link to="/signup" className="signup-link">
          Sign up here
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
<button type="submit" className="btn login-btn">
          Login
        </button>
        <button type="button" onClick={handleReset} className="btn reset-btn">
          Reset
        </button>
      </form>

      <p className="forgot-password">Forgot Password</p>
    </div>
  );
};

export default Login;
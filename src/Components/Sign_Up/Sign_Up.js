import React, { useState } from "react";
import "./Sign_Up.css"; // your CSS file

function SignUp() {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validate and submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
  
    if (!formData.role) validationErrors.role = "Please select a role.";
    if (!formData.name.trim()) validationErrors.name = "Name is required.";
  
    // phone number validation
    if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be exactly 10 digits.";
    }
  
    if (!formData.email.includes("@"))
      validationErrors.email = "Please enter a valid email.";
  
    if (formData.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters.";
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
  
      // ✅ store dummy token and email to simulate login
      sessionStorage.setItem("auth-token", "dummy_token_here");
      sessionStorage.setItem("email", formData.email);
  
      // ✅ redirect or reload to show logout button in Navbar
      window.location.href = "/";
    }
  };
  const handleReset = () => {
    setFormData({
      role: "",
      name: "",
      phone: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <p>
        Already a member? <a href="/login">Login</a>
      </p>

      <form onSubmit={handleSubmit}>
        <label>Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select role</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
        {errors.role && <small className="error">{errors.role}</small>}

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <small className="error">{errors.name}</small>}

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <small className="error">{errors.phone}</small>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="error">{errors.email}</small>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <small className="error">{errors.password}</small>}

        <div className="buttons">
          <button type="submit" className="btn submit">Submit</button>
          <button type="button" onClick={handleReset} className="btn reset">Reset</button>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
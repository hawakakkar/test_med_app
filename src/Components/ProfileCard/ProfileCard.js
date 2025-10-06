import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", phone: "" });
  const [updatedDetails, setUpdatedDetails] = useState({ name: "", email: "", phone: "" });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email");

        if (!authtoken) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            Email: email,
          },
        });

        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handlers
  const handleCardClick = () => setShowForm(true);
  const handleEdit = () => setEditMode(true);
  const handleInputChange = (e) =>
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
        setShowForm(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      {!showForm ? (
        <div className="profile-card" onClick={handleCardClick}>
          <h3>Your Profile</h3>
          <p>{userDetails.name}</p>
          <p>{userDetails.email}</p>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          {editMode ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedDetails.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedDetails.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={updatedDetails.phone}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save</button>
            </>
          ) : (
            <>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Phone: {userDetails.phone}</p>
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default ProfileCard;
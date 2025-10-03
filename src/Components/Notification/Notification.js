import React from "react";
import "./Notification.css";

const Notification = ({ appointmentData, onDismiss }) => {
  if (!appointmentData) return null; // only show if data exists

  return (
    <div className="notification-container">
      <h3>Appointment Details</h3>
      <p><strong>Doctor:</strong> {appointmentData.doctor}</p>
      <p><strong>Speciality:</strong> {appointmentData.speciality}</p>
      <p><strong>Name:</strong> {appointmentData.username}</p>
      <p><strong>Phone:</strong> {appointmentData.phone}</p>
      <p><strong>Date of Appointment:</strong> {appointmentData.date}</p>
      <p><strong>Time:</strong> {appointmentData.time}</p>
      <button className="dismiss-btn" onClick={onDismiss}>Dismiss</button>
    </div>
  );
};

export default Notification;
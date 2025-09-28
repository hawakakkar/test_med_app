import React, { useState } from 'react';
import './AppointmentFormIC.css'; // make sure this file exists

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  // local state for form fields
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // pass data up to DoctorCardIC
    onSubmit({ name, phoneNumber });
    // clear form fields
    setName('');
    setPhoneNumber('');
  };

  return (
    <form
      className="appointment-form-ic"
      onSubmit={handleFormSubmit}
    >
      <h3>Book Appointment with {doctorName}</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentFormIC;
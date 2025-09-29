import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(''); // ✅ new state
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, appointmentDate, selectedSlot });
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      {/* ✅ Add your new Date of Appointment field here */}
      <div className="form-group">
        <label htmlFor="appointmentDate">Date of Appointment:</label>
        <input
          type="text" // changed from date to text
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          placeholder="dd-----yyyy" // ✅ custom placeholder
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="timeSlot">Book Time Slot:</label>
        <select
          id="timeSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          <option value="9-11am">9:00 - 11:00 AM</option>
          <option value="11-1pm">11:00 - 1:00 PM</option>
          <option value="2-4pm">2:00 - 4:00 PM</option>
        </select>
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, image, onBook }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);

    // Remove from localStorage (optional)
    localStorage.removeItem(name);
    localStorage.removeItem("doctorData");
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData, // expects { name, phoneNumber, appointmentDate, timeSlot }
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);

    // Save doctor info + appointment in localStorage (optional)
    localStorage.setItem(
      "doctorData",
      JSON.stringify({ name, speciality, experience, ratings, image })
    );
    localStorage.setItem(name, JSON.stringify(newAppointment));

    // ✅ Trigger Notification in App.js
    if (typeof onBook === "function") {
      onBook(
        appointmentData.name,           // user name
        appointmentData.phoneNumber,    // phone
        appointmentData.appointmentDate,// date
        appointmentData.timeSlot        // time
      );
    }
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <img
            src={
              image
                ? image
                : 'https://i.pinimg.com/736x/6a/e1/59/6ae1599c62af3dc358f95d68bf344298.jpg'
            }
            alt={name}
            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
          />
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button
              onClick={handleBooking}
              className={`book-appointment-btn ${
                appointments.length > 0 ? 'cancel-appointment' : ''
              }`}
            >
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div
              className="doctorbg"
              style={{ height: '100vh', overflow: 'scroll' }}
            >
              <div>
                <div className="doctor-card-profile-image-container">
                  <img
                    src={
                      image
                        ? image
                        : 'https://i.pinimg.com/736x/6a/e1/59/6ae1599c62af3dc358f95d68bf344298.jpg'
                    }
                    alt={name}
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">
                    {experience} years experience
                  </div>
                  <div className="doctor-card-detail-consultationfees">
                    Ratings: {ratings}
                  </div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.appointmentDate}</p>
                      <p>Time Slot: {appointment.timeSlot}</p>
                      <button onClick={() => handleCancel(appointment.id)}>
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentFormIC
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit} // ✅ pass the submit handler
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;
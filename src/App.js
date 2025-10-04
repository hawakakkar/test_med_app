import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage'; 
import SignUp from "./Components/Sign_Up/Sign_Up";  
import Login from './Components/Login/Login';                  
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [appointmentData, setAppointmentData] = useState(null);

  // Called after booking in InstantConsultation
  const handleBooking = (data) => {
    setAppointmentData(data); // show notification
  };

  const handleDismiss = () => {
    setAppointmentData(null); // hide notification
  };

  return (
    <BrowserRouter>
      {/* Notification always rendered at top */}
      <Notification appointmentData={appointmentData} onDismiss={handleDismiss} />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />  
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/appointments" element={<InstantConsultation onBooking={handleBooking} />} />
        <Route path="/instant-consultation" element={<InstantConsultation onBooking={handleBooking} />} />

        {/* ✅ ReviewForm works even if appointmentData is empty */}
        <Route path="/reviews" element={<ReviewForm appointmentData={appointmentData || {}} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage'; 
import SignUp from "./Components/Sign_Up/Sign_Up";  
import Login from './Components/Login/Login';                  
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation';

function App() {
  return (
    <BrowserRouter>
      <Navbar />   {/* always visible */}

      <Routes>
        {/* Home page */}
        <Route path="/" element={<LandingPage />} />  

        {/* SignUp/Login pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> 

        {/* Appointment page */}
        <Route path="/appointments" element={<InstantConsultation />} />

        {/* Optional direct link */}
        <Route path="/instant-consultation" element={<InstantConsultation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
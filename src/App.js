import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage'; 
import SignUp from "./Components/Sign_Up/Sign_Up";  
import Login from './Components/Login/Login';                  
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* This renders at top of every page */}
      {/* Add InstantConsultation component where you want it */}
      <InstantConsultation />

      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* LandingPage */}
        {/* Route for signup page */}
        <Route path="/signup" element={<SignUp />} />
        {/* Route for login page */}
        <Route path="/login" element={<Login />} /> 
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
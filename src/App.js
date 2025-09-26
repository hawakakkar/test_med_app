import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage'; 
import SignUp from "./Components/Sign_Up/Sign_Up";  
import Login from './Components/Login/Login';                  

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />  {/* LandingPage */}
          {/* Route for signup page */}
          <Route path="/signup" element={<SignUp />} />
          {/* Route for login page */}
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
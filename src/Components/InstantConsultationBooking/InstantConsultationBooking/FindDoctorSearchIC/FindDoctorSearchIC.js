import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

// initialize specialities
const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearchIC = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);
  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/instant-consultation?speciality=${speciality}`);
    window.location.reload();
  };

  return (
    <div className='finddoctor'>
      <center>
        <h1>Find a doctor and Consult instantly</h1>

        {/* Search Bar */}
        <div
          className="home-search-container"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="doctor-search-box">
  {/* wrapper of input + icon */}
  <div className="search-input-wrapper">
    <input
      type="text"
      className="search-doctor-input-box"
      placeholder="Search doctors, clinics, hospitals, etc."
      onFocus={() => setDoctorResultHidden(false)}
      onBlur={() => setDoctorResultHidden(true)}
      value={searchDoctor}
      onChange={(e) => setSearchDoctor(e.target.value)}
    />

    <span className="search-icon-box">
      <i className="fas fa-search"></i>
    </span>
  
</div>

            {/* Dropdown results */}
            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialities.map((speciality) => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleDoctorSelect(speciality)}
                >
                  {/* magnifying glass on left for each item */}
                  <span className="specialty-icon">
                    <i className="fas fa-search"></i>
                    
                  </span>
                  <span>{speciality}</span>
                  <span className="specialty-label">SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;
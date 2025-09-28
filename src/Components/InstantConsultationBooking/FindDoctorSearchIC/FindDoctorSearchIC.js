import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const FindDoctorSearchIC = ({ speciality }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const navigate = useNavigate();

  const handleDoctorSelect = (item) => {
    setSearchDoctor(item);
    setDoctorResultHidden(true);
    // use backticks for template string
    navigate(`/instant-consultation?speciality=${item}`);
    window.location.reload();
  };

  return (
    <div className='finddoctor'>
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div>
          <i
            style={{ color: '#000000', fontSize: '20rem' }}
            className="fa fa-user-md"
          ></i>
        </div>

        <div
          className="home-search-container"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setDoctorResultHidden(true)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />

            <div className="findiconimg">
              <img
                className='findIcon'
                src={process.env.PUBLIC_URL + '/images/search.svg'}  // <-- quotes added
                alt=""
              />
            </div>

            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {speciality && speciality.map((item) => (
                <div
                  className="search-doctor-result-item"
                  key={item}
                  onMouseDown={() => handleDoctorSelect(item)}
                >
                  <span>
                    <img
                      src={process.env.PUBLIC_URL + '/images/search.svg'}  // <-- quotes added
                      alt=""
                      style={{ height: '10px', width: '10px' }}
                      width="12"
                    />
                  </span>
                  <span>{item}</span>
                  <span>SPECIALITY</span>
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
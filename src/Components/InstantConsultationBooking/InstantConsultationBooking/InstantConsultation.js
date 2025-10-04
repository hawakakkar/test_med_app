import React, { useEffect, useState, useCallback } from 'react';
import './InstantConsultation.css';
import { useSearchParams, Link } from 'react-router-dom'; // ✅ Added Link
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = ({ onBooking }) => { // ✅ receive onBooking from App.js
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const doctorImages = {
    'Dr. Denis Raj':
      'https://bpic.588ku.com/element_origin_min_pic/23/09/25/77212ff637c099e705b1fbd04b5d26b4.jpg',
    'Dr. Jiao Yang':
      'https://i.pinimg.com/736x/6a/e1/59/6ae1599c62af3dc358f95d68bf344298.jpg',
    'Dr. Lyn Christie':
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSAJsGn2UHZ507PT2boeQtQlmljrq91Ea8oQxFZUA8xNW7NIB7T',
  };

  const getDoctorsDetails = useCallback(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then((res) => res.json())
      .then((data) => {
        if (searchParams.get('speciality')) {
          const filtered = data.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() ===
              searchParams.get('speciality').toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, [getDoctorsDetails]);

  // ✅ Booking calls App.js onBooking
  const handleBooking = (doctor, speciality, username, phone, date, time) => {
    const appointment = { username, phone, doctor, speciality, date, time };

    if (onBooking) {
      onBooking(appointment);
    }

    alert("Appointment booked successfully!");
  };

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />

        <div className="search-results-container">
          {isSearched && (
            <center>
              <h2>
                {filteredDoctors.length} doctors are available{' '}
                {searchParams.get('location')}
              </h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor details
              </h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC
                    key={doctor.name}
                    name={doctor.name}
                    speciality={doctor.speciality}
                    experience={doctor.experience}
                    ratings={doctor.ratings}
                    image={doctorImages[doctor.name]}
                    onBook={(username, phone, date, time) =>
                      handleBooking(
                        doctor.name,
                        doctor.speciality,
                        username,
                        phone,
                        date,
                        time
                      )
                    }
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}

              {/* ✅ Added Feedback Access Button */}
              <div style={{ marginTop: '20px' }}>
                <Link to="/review">
                  <button className="feedback-btn">Leave Feedback</button>
                </Link>
              </div>
            </center>
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
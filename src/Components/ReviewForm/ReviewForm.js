import React, { useState } from "react";
import "./ReviewForm.css";

function ReviewForm({ appointmentData }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  // Store reviews and disable state for each doctor
  const [doctorReviews, setDoctorReviews] = useState([
    { id: 1, doctor: "Dr. John Doe", specialty: "Cardiology", review: "", reviewed: false },
    { id: 2, doctor: "Dr. Jane Smith", specialty: "Dermatology", review: "", reviewed: false },
  ]);

  const handleFeedbackClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
    setName("");
    setReview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the review for that doctor
    setDoctorReviews((prev) =>
      prev.map((d) =>
        d.id === selectedDoctor.id
          ? { ...d, review: review, reviewed: true }
          : d
      )
    );

    setShowForm(false);
    alert(`Review submitted for ${selectedDoctor.doctor}:\n${review}`);
  };

  return (
    <div className="review-form-container">
      <h1 className="page-title">Reviews</h1>

     

      <div className="table-wrap">
        <table className="reviews-table" role="table" aria-label="Doctor reviews">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Specialty</th>
              <th>Provide feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>

          <tbody>
            {doctorReviews.map((r, idx) => (
              <tr key={r.id}>
                <td>{idx + 1}</td>
                <td>{r.doctor}</td>
                <td>{r.specialty}</td>
                <td>
                  <button
                    type="button"
                    className="primary-btn"
                    disabled={r.reviewed}
                    onClick={() => handleFeedbackClick(r)}
                  >
                    {r.reviewed ? "Submitted" : "Click Here"}
                  </button>
                </td>
                {/* Display review text here */}
                <td
                  style={{
                    border: "5px solid red",
                    minWidth: "200px",
                    textAlign: "center",
                  }}
                >
                  {r.review || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Give Your Review</h2>
            

            <form onSubmit={handleSubmit} className="popup-form">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Review:</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
              <label>Rating:</label>
              <p>⭐⭐⭐⭐⭐</p>
              
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
import React, { useState, useEffect } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Dummy report data (replace later with API data)
    setReports([
      { id: 1, doctorName: "Dr. John Doe", speciality: "Cardiology" },
      { id: 2, doctorName: "Dr. Jane Smith", speciality: "Dermatology" },
    ]);
  }, []);

  const handleView = (id) => {
    alert(`Viewing report #${id}`);
  };

  const handleDownload = (id) => {
    alert(`Downloading report #${id}`);
  };

  return (
    <div className="reports-layout">
      <h2 className="reports-title">Reports</h2>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <button
                  className="report-btn view-btn"
                  onClick={() => handleView(report.id)}
                >
                  View Report
                </button>
              </td>
              <td>
                <button
                  className="report-btn download-btn"
                  onClick={() => handleDownload(report.id)}
                >
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
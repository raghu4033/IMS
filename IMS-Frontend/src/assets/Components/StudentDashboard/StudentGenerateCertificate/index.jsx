import React from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";
import userLogo from "../../../Images/logo.png"; // Import the logo

export const StudentGenerateCertificate = () => {
  return (
    <>
      <div className="card-table-container">
        <h2 className="form-heading">My Certificates and Grades</h2>
        <hr />
        <div className="card-table">
          <table id="certificate-table">
            <thead>
              <tr>
                <th>User Image</th>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Certificate Grade</th>
                <th>Date</th>
                <th>Certificate Attachment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="img/user.png" className="certificate-table-img" alt="User" /></td>
                <td>123456</td>
                <td>Harshad Satasiya</td>
                <td>A</td>
                <td>2024-06-15</td>
                <td><a href="certificate1.pdf" className="edit-btn" target="_blank">View Certificate</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="student-certificate">
          <div className="certificate-container">
            <img src={userLogo} alt="Institute Logo" className="certificate-logo" />
            <h1 className="certificate-title">Certificate of Achievement</h1>
            <p className="certificate-text">This is to certify that</p>
            <h2 className="student-name">Harshad Satasiya</h2>
            <p className="certificate-text">has successfully completed the</p>
            <h3 className="course-name">Fashion Designing Course</h3>
            <p className="certificate-text">with excellent grades.</p>
            <p className="certificate-date">Date: 2024-06-15</p>
            <div className="signature-section">
              <div className="signature">
                <p>_______________________</p>
                <p className="signature-title">Institute Director</p>
                <p className="signature-name">Harshadkumar</p>
              </div>
              <div className="signature">
                <p>_______________________</p>
                <p className="signature-title">Course Instructor</p>
                <p className="signature-name">Irene Kwon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

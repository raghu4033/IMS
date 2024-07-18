import React from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

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
                <td><img src="img/user.png" className="certificate-table-img" alt="User Image" /></td>
                <td>123456</td>
                <td>Harshad Satasiya</td>
                <td>A</td>
                <td>2024-06-15</td>
                <td><a href="certificate1.pdf" className="edit-btn" target="_blank">View Certificate</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

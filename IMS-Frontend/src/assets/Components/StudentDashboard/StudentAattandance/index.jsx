import React from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentAattandance = () => {
  return (
    <>
      <div className="card-table-container">
        <h2 className="form-heading">Attendance Summary</h2>
        <hr />
        <div className="summary-cards">
          <div className="attandence-card total-sessions">
            <h3>Total Sessions</h3>
            <p className="count">0</p>
          </div>
          <div className="attandence-card present">
            <h3>Present</h3>
            <p className="count">0</p>
          </div>
          <div className="attandence-card absent">
            <h3>Absent</h3>
            <p className="count">0</p>
          </div>
          <div className="attandence-card percentage">
            <h3>Percentage</h3>
            <p className="count">0%</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="card-table-container">
        <h2 className="form-heading">Attendance Details</h2>
        <div className="card-table">
          <table id="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Absent/Present</th>
                <th>Faculty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-06-01</td>
                <td>Present</td>
                <td>Prof. B</td>
              </tr>
              <tr>
                <td>2024-06-02</td>
                <td>Absent</td>
                <td>Prof. A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

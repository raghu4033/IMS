import React from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentClassSchedule = () => {
  return (
    <>
      <div className="class-schedule-container">
        <h2 className="card-heading">Class Schedule</h2>
        <div className="schedule-card">
          <div className="class-progress">
            <div className="class-item">
              <div className="class-info">
                <h3>Mathematics</h3>
                <hr />
                <p><strong>Date:</strong> 2024-06-06</p>
                <p><strong>Time:</strong> 11:45 AM</p>
                <p><strong>Class Type:</strong> Lab</p>
                <p><strong>Faculty:</strong> Prof. B</p>
              </div>
              <div className="progress-bar"></div>
            </div>
            <div className="class-item">
              <div className="class-info">
                <h3>Physics</h3>
                <hr />
                <p><strong>Date:</strong> 2024-06-06</p>
                <p><strong>Time:</strong> 11:45 AM</p>
                <p><strong>Class Type:</strong> Lab</p>
                <p><strong>Faculty:</strong> Prof. B</p>
              </div>
              <div className="progress-bar"></div>
            </div>
            <div className="class-item">
              <div className="class-info">
                <h3>Chemistry</h3>
                <hr />
                <p><strong>Date:</strong> 2024-06-06</p>
                <p><strong>Time:</strong> 11:45 AM</p>
                <p><strong>Class Type:</strong> Lab</p>
                <p><strong>Faculty:</strong> Prof. B</p>
              </div>
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

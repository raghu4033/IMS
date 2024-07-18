import React from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentAnnouncements = () => {
  return (
    <>
      <div className="announcement-container">
        <h2 className="form-heading">Announcements</h2>
        <hr />
        <div className="announcement-card">
          <div className="announcement-header">
            <h3>Course: Computer Science</h3>
            <p>Date: 2024-06-01</p>
          </div>
          <div className="announcement-body">
            <h4>Notice Subject: Midterm Exam</h4>
            <p>Description: The midterm exam will be held on 2024-06-15. Please prepare accordingly and refer to the syllabus for the topics covered.</p>
          </div>
          <div className="announcement-footer">
            <a href="attachments/exam-syllabus.pdf" className="attachment-link" download>Download Attachment</a>
          </div>
        </div>
        <div className="announcement-card">
          <div className="announcement-header">
            <h3>Course: Mathematics</h3>
            <p>Date: 2024-06-02</p>
          </div>
          <div className="announcement-body">
            <h4>Notice Subject: Assignment Due</h4>
            <p>Description: The assignment on calculus is due by 2024-06-10. Submit it through the online portal.</p>
          </div>
          <div className="announcement-footer">
            <a href="attachments/calculus-assignment.pdf" className="attachment-link" download>Download Attachment</a>
          </div>
        </div>
      </div>
    </>
  );
};

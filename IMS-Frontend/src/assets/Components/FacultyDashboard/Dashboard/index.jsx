import React, { useEffect, useState } from 'react';
import './style.css';
import UserImg from "../../../Images/user.png";

export const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  // Sample student data
  const students = [
    { id: 'S001', name: 'John', photo: UserImg },
    { id: 'S002', name: 'Jane', photo: UserImg },
    { id: 'S003', name: 'Mike', photo: UserImg },
    { id: 'S004', name: 'Anna', photo: UserImg },
    { id: 'S005', name: 'Bob', photo: UserImg },
    { id: 'S006', name: 'Alice', photo: UserImg },
    { id: 'S007', name: 'Tom', photo: UserImg },
    { id: 'S008', name: 'Sue', photo: UserImg },
    { id: 'S009', name: 'Sam', photo: UserImg },
    { id: 'S010', name: 'Kate', photo: UserImg },
  ];

  return (
    <div className="faculty-dashboard">
      <div className="clock">
        <p className="clock-time">{formatTime(time)}</p>
      </div>
      <div className="faculty-dashboard-stats">
        <div className="stats-container">
          {students.slice(0, 10).map(student => (
            <div key={student.id} className="stats-box stats-student">
              <img src={student.photo} alt={student.name} className="student-photo" />
              <h3 className="stats-title">{student.name}</h3>
              <p className="stats-value">{student.id}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="upcoming-events-section">
        <h2 className="section-title">New Student Inquiry</h2>
        <hr/>
        <ul className="inquiry-list">
          <li className="inquiry-item">01/07/2024, John Doe, john@example.com, 1234567890, 1234567890, Computer Science</li>
          <li className="inquiry-item">02/07/2024, Jane Smith, jane@example.com, 2345678901, 2345678901, Information Technology</li>
          <li className="inquiry-item">03/07/2024, Mike Johnson, mike@example.com, 3456789012, 3456789012, Software Engineering</li>
        </ul>
      </div>
      <div className="recent-notifications-section">
        <div className="recent-activities-section">
          <h2 className="section-title">Upcoming Events</h2>
          <hr/>
          <ul className="event-list">
            <li className="event-item">Hackathon, Room 101, 20/07/2024, Coding Club</li>
            <li className="event-item">Guest Lecture, Auditorium, 25/07/2024, Tech Department</li>
            <li className="event-item">Workshop, Lab 3, 30/07/2024, Development Team</li>
          </ul>
        </div>
        <div className="notifications-section">
          <h2 className="section-title">Student Announcements</h2>
          <hr/>
          <ul className="announcement-list">
            <li className="announcement-item">Exam Schedule, Exams will start from 01/08/2024</li>
            <li className="announcement-item">Project Submission, Submit projects by 31/07/2024</li>
            <li className="announcement-item">Holiday Notice, College will be closed on 15/08/2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

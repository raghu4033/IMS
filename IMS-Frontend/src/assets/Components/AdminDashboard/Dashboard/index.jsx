import React, { useState, useEffect } from 'react';
import './style.css';

export const Dashboard = () => {
  // State for clock
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Update the clock every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Dummy records
  const recentInquiries = [
    { id: 1, name: 'Harshad', date: '2024-07-01' },
    { id: 2, name: 'Manthan', date: '2024-07-02' },
  ];

  const recentSchedules = [
    { id: 1, course: 'Math 101', date: '2024-07-01' },
    { id: 2, course: 'History 201', date: '2024-07-02' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="clock">
        <p className="clock-time">{currentTime}</p>
      </div>
      <div className="dashboard-stats">
        <div className="stats-box stats-students">
          <h3 className="stats-title">Total Students</h3>
          <p className="stats-value">1500</p>
        </div>
        <div className="stats-box stats-faculty">
          <h3 className="stats-title">Total Faculty</h3>
          <p className="stats-value">100</p>
        </div>
        <div className="stats-box stats-fees">
          <h3 className="stats-title">Total Fees</h3>
          <p className="stats-value">$200,000</p>
        </div>
        <div className="stats-box stats-events">
          <h3 className="stats-title">Total Events</h3>
          <p className="stats-value">25</p>
        </div>
      </div>
     
      <div className="recent-section">
        <div className="recent recent-inquiries">
          <h3 className="recent-title">Recent Inquiries</h3>
          <ul>
            {recentInquiries.map(inquiry => (
              <li key={inquiry.id}>
                <span>{inquiry.name}</span>
                <span>{inquiry.course}</span>
                <span>{inquiry.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="recent recent-schedule">
          <h3 className="recent-title">Recent Schedules</h3>
          <ul>
            {recentSchedules.map(schedule => (
              <li key={schedule.id}>
                <span>{schedule.title}</span>
                <span>{schedule.time}</span>
                <span>{schedule.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="recent recent-inquiries">
          <h3 className="recent-title">Recent Inquiries</h3>
          <ul>
            {recentInquiries.map(inquiry => (
              <li key={inquiry.id}>
                <span>{inquiry.name}</span>
                <span>{inquiry.course}</span>
                <span>{inquiry.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="recent recent-schedule">
          <h3 className="recent-title">Recent Announcements</h3>
          <ul>
            {recentSchedules.map(schedule => (
              <li key={schedule.id}>
                <span>{schedule.title}</span>
                <span>{schedule.time}</span>
                <span>{schedule.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

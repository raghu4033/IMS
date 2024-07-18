import React from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentEvents = () => {
  return (
    <>
      <div className="events-container">
        <h2 className="form-heading">Upcoming Events</h2>
        <hr />
        <div className="event-card">
          <div className="event-header">
            <h3>College Sports Day</h3>
            <span className="event-date">June 15, 2024</span>
          </div>
          <div className="event-details">
            <p><strong>Location:</strong> College Ground</p>
            <p><strong>Time:</strong> 09:00 AM - 04:00 PM</p>
            <p><strong>Description:</strong> Join us for a day of fun and sports. Participate in various sports events and win exciting prizes.</p>
          </div>
        </div>
        <div className="event-card">
          <div className="event-header">
            <h3>Cultural Fest</h3>
            <span className="event-date">July 1, 2024</span>
          </div>
          <div className="event-details">
            <p><strong>Location:</strong> Auditorium</p>
            <p><strong>Time:</strong> 05:00 PM - 09:00 PM</p>
            <p><strong>Description:</strong> Celebrate the cultural diversity of our college. Enjoy performances, music, and dance from different cultures.</p>
          </div>
        </div>
      </div>
    </>
  );
};

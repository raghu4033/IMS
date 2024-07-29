import React, { useEffect, useState } from "react";
import moment from "moment";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEvents = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getEvents);
      if (resp.status === 200 && resp.data?.data) {
        setEvents(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="events-container">
      <h2 className="form-heading">Upcoming Events</h2>
      <hr />
      {!loading ? (
        events.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-header">
              <h3>{event.name}</h3>
              <span className="event-date">
                {moment(event.date).isValid()
                  ? moment(event.date).format("DD MMMM YYYY")
                  : "N/A"}
              </span>
            </div>
            <div className="event-details">
              <p><strong>Location:</strong> {event.place || "N/A"}</p>
              <p><strong>Organized By:</strong> {[event.user?.firstName, event.user?.middleName].filter(Boolean).join(" ") || "N/A"}</p>
              <p><strong>Description:</strong> {event.description || "No description available."}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

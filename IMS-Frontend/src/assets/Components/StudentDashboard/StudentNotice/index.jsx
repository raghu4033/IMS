import React, { useEffect, useState } from "react";
import moment from "moment";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentNotice = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAnnouncements = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getAnnouncements);
      if (resp.status === 200 && resp.data?.data) {
        setAnnouncements(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <div className="announcement-container">
      <h2 className="form-heading">Announcements</h2>
      <hr />
      {!loading ? (
        announcements.map((announcement) => (
          <div className="announcement-card" key={announcement.id}>
            <div className="announcement-header">
              <h3>Course: {announcement.course?.name || "N/A"}</h3>
              <p>Date: {moment(announcement.date).isValid() ? moment(announcement.date).format("YYYY-MM-DD") : "N/A"}</p>
            </div>
            <div className="announcement-body">
              <h4>Notice Subject: {announcement.subject || "N/A"}</h4>
              <p>Description: {announcement.description || "No description available."}</p>
            </div>
            <div className="announcement-footer">
              <a href={announcement.attachmentUrl || "#"} className="attachment-link" download>Download Attachment</a>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

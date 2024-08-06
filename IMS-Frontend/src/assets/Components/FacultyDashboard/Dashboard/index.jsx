import moment from "moment";
import React, { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import UserImg from "../../../Images/user.png";
import "./style.css";

export const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  const [dashboardSummary, setDashboardSummary] = useState({});
  const [loading, setLoading] = useState(false);

  const getDashboardSummary = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.dashboardSummary);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setDashboardSummary(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardSummary();
  }, []);

  return (
    <div className="faculty-dashboard">
      <div className="clock">
        <p className="clock-time">{formatTime(time)}</p>
      </div>
      <div className="faculty-dashboard-stats">
        <div className="stats-container">
          {dashboardSummary?.latest5Students ? (
            dashboardSummary.latest5Students.map((student) => (
              <div key={student._id} className="stats-box stats-student">
                <img
                  src={UserImg}
                  alt={student.name}
                  className="student-photo"
                />
                <h3 className="stats-title">
                  {[student?.firstName, student?.lastName]
                    .filter(Boolean)
                    .join(" ")}
                </h3>
                <p className="stats-value">{student?.sid || "N/A"}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      {dashboardSummary?.latest2Inquiry ? (
        <div className="upcoming-events-section">
          <h2 className="section-title">New Student Inquiry</h2>
          <hr />
          <ul className="inquiry-list">
            {dashboardSummary?.latest2Inquiry?.map((inq) => {
              return (
                <li className="inquiry-item" key={inq?._id}>
                  {[
                    inq?.fullName,
                    inq?.joiningDate && moment(inq?.joiningDate).isValid()
                      ? moment(inq?.joiningDate).format("DD MMM YYYY")
                      : "N/A",
                    inq?.email,
                    inq?.mobile,
                  ]
                    .map((i) => i || "N/A")
                    .join(", ")}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
      <div className="recent-notifications-section">
        {dashboardSummary?.latest2Event ? (
          <div className="recent-activities-section">
            <h2 className="section-title">Upcoming Events</h2>
            <hr />
            <ul className="event-list">
              {dashboardSummary?.latest2Event?.map((event) => {
                return (
                  <li className="event-item" key={event?._id}>
                    {[
                      event?.name,
                      event?.date && moment(event?.date).isValid()
                        ? moment(event?.date).format("DD MMM YYYY")
                        : "N/A",
                    ]
                      .map((i) => i || "N/A")
                      .join(", ")}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {dashboardSummary?.latest2Announcements ? (
          <div className="notifications-section">
            <h2 className="section-title">Student Announcements</h2>
            <hr />
            <ul className="announcement-list">
              {dashboardSummary.latest2Announcements.map((announce) => {
                return (
                  <li className="announcement-item" key={announce._id}>
                    {[
                      announce?.subject,
                      moment(announce?.date).format("DD MMM YYYY"),
                    ]
                      .map((i) => i || "N/A")
                      .join(", ")}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

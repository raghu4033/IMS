import moment from "moment";
import { useEffect, useState } from 'react';
import ApiService from "../../../../Utils/ApiService";
import Loader from "../../Common/Loader";
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

  const [dashboardSummary, setDashboardSummary] = useState({});
  const [loading, setLoading] = useState(true);

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

  if(loading) {
    return <Loader />
  }

  return (
    <div className="admin-dashboard">
      <div className="clock">
        <p className="clock-time">{currentTime}</p>
      </div>
      <div className="dashboard-stats">
        <div className="stats-box stats-students">
          <h3 className="stats-title">Total Students</h3>
          <p className="stats-value">{dashboardSummary?.totalStudents ?? "N/A"}</p>
        </div>
        <div className="stats-box stats-faculty">
          <h3 className="stats-title">Total Faculty</h3>
          <p className="stats-value">{dashboardSummary?.totalFaculties ?? "N/A"}</p>
        </div>
        <div className="stats-box stats-fees">
          <h3 className="stats-title">Total Fees</h3>
          <p className="stats-value">{dashboardSummary?.totalFees ? `$ ${Number(dashboardSummary?.totalFees).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })}` : "N/A"}</p>
        </div>
        <div className="stats-box stats-events">
          <h3 className="stats-title">Total Events</h3>
          <p className="stats-value">{dashboardSummary?.totalEvents ?? "N/A"}</p>
        </div>
      </div>

      <div className="recent-section">
        {dashboardSummary?.latest2Inquiry ? <div className="recent recent-inquiries">
          <h3 className="recent-title">Recent Inquiries</h3>
          <ul>
            {dashboardSummary?.latest2Inquiry?.map(inquiry => (
              <li key={inquiry._id}>
                <span>{inquiry?.fullName || "N/A"}</span>
                {/* <span>{inquiry.course}</span> */}
                <span>{inquiry?.joiningDate && moment(inquiry?.joiningDate).isValid()
                  ? moment(inquiry?.joiningDate).format("DD MMMM YYYY")
                  : "N/A"}</span>
              </li>
            ))}
          </ul>
        </div> : <></>}
        {dashboardSummary?.latest2ClassSchedule ? <div className="recent recent-inquiries">
          <h3 className="recent-title">Recent Schedules</h3>
          <ul>
            {dashboardSummary?.latest2ClassSchedule?.map(event => (
              <li key={event._id}>
                <span>{event?.course?.name || "N/A"}</span>
                {/* <span>{event.course}</span> */}
                <span>{event?.fromDate && moment(event?.fromDate).isValid()
                  ? moment(event?.fromDate).format("DD MMMM YYYY")
                  : "N/A"}</span>
              </li>
            ))}
          </ul>
        </div> : <></>}
        {dashboardSummary?.latest2Event ? <div className="recent recent-inquiries">
          <h3 className="recent-title">Recent Inquiries</h3>
          <ul>
            {dashboardSummary?.latest2Event?.map(event => (
              <li key={event._id}>
                <span>{event?.name || "N/A"}</span>
                {/* <span>{event.course}</span> */}
                <span>{event?.date && moment(event?.date).isValid()
                  ? moment(event?.date).format("DD MMMM YYYY")
                  : "N/A"}</span>
              </li>
            ))}
          </ul>
        </div> : <></>}
      </div>
    </div>
  );
};

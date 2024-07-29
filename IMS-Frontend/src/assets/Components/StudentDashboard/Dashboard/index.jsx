import { useNavigate } from 'react-router-dom';
import './style.css';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="dashboard-main dashboard-custome">
      <section className="dashboard-overview">
        <div className="overview-card dashboard-card">
          <h2>Hello Harshadkumar, welcome back!</h2>
          <p>Here’s a quick overview of your recent activities and upcoming events.</p>
        </div>
      </section>

      <section className="dashboard-widgets">
        <div className="widget-container">
          <div className="widget widget-profile" onClick={() => navigate("/student-profile")}>
            <h3>View Profile</h3>
            <p> profile details.</p>
          </div>
          <div className="widget widget-attendance" onClick={() => navigate("/student-attandance")}>
            <h3>Attendance</h3>
            <p>Check your attendance record.</p>
          </div>
          <div className="widget widget-schedule" onClick={() => navigate("/student-class-schedule")}>
            <h3>ClassName Schedule</h3>
            <p>View your className schedule.</p>
          </div>
          <div className="widget widget-events" onClick={() => navigate("/student-fees")}>
            <h3>Fees</h3>
            <p>Find information about upcoming events.</p>
          </div>
          <div className="widget widget-notice" onClick={() => navigate("/student-announcements")}>
            <h3>Notice Board</h3>
            <p>latest notices and announcements.</p>
          </div>
          <div className="widget widget-fees" onClick={() => navigate("/student-events")}>
            <h3>Event</h3>
            <p>Overview of your fee payments and pending dues.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

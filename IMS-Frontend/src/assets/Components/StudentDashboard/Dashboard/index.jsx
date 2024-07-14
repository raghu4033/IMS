export const Dashboard = () => {
  return (
    <main className="dashboard-main">
      <section className="dashboard-overview">
        <div className="overview-card dashboard-card">
          <h2>Hello Harshadkumar, welcome back!</h2>
          <p>Here’s a quick overview of your recent activities and upcoming events.</p>
        </div>
      </section>

      <section class="dashboard-widgets">
            <div class="widget-container">
                <div class="widget widget-profile">
                    <h3>View Profile</h3>
                    <p> profile details.</p>
                </div>
                <div class="widget widget-attendance">
                    <h3>Attendance</h3>
                    <p>Check your attendance record.</p>
                </div>
                <div class="widget widget-schedule">
                    <h3>Class Schedule</h3>
                    <p>View your class schedule.</p>
                </div>
                <div class="widget widget-events">
                    <h3>Fees</h3>
                    <p>Find information about upcoming events.</p>
                </div>
                <div class="widget widget-notice">
                    <h3>Notice Board</h3>
                    <p>latest notices and announcements.</p>
                </div>
                <div class="widget widget-fees">
                    <h3>Event</h3>
                    <p>Overview of your fee payments and pending dues.</p>
                </div>
            </div>
        </section>
    </main>
  );
};

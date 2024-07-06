import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import IMSDashboardLogo from "../../../Images/dashboard-logo.png";
import "./style.css";

export const Layout = ({ menu, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve user profile from local storage
  const profile = JSON.parse(localStorage.getItem("ims:auth:profile") || "{}");
  const userRole = profile.role || "";

  // Determine class names based on user role
  const sidebarClassName = userRole === "ADMIN" 
    ? "dashboard-sidebar" 
    : userRole === "STUDENT" 
    ? "student-dashboard-sidebar" 
    : userRole === "FACULTY" 
    ? "faculty-dashboard-sidebar" 
    : "dashboard-sidebar";

  const headerClassName = userRole === "ADMIN" 
    ? "dashboard-header" 
    : userRole === "STUDENT" 
    ? "student-dashboard-header" 
    : userRole === "FACULTY" 
    ? "faculty-dashboard-header" 
    : "dashboard-header";

  const logoClassName = userRole === "ADMIN"
    ? "sidebar-logo"
    : userRole === "STUDENT"
    ? "student-sidebar-logo"
    : userRole === "FACULTY"
    ? "faculty-sidebar-logo"
    : "sidebar-logo";

  const navigateToMenu = (url) => {
    navigate(url);
  };

  return (
    <div className="dashboard-container">
      <aside className={sidebarClassName}>
        <div className={logoClassName}>
          <img src={IMSDashboardLogo} alt="Logo" />
        </div>
        <nav className="sidebar-menu">
          <ul>
            {menu.map((m, index) => (
              <li key={index}>
                <span
                  onClick={() => navigateToMenu(m.key)}
                  className={location.pathname === m.key ? `active` : ""}
                >
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="dashboard-main">
        <header className={headerClassName}>
          <div className="user-info" onClick={() => {}}>
            <div className="user-logo">HS</div>
            <span className="user-name">Harshad</span>
            <div className="dropdown-menu">
              <a href="#">Profile</a>
              <a href="#">Change Password</a>
              <a href="#">Logout</a>
            </div>
          </div>
        </header>
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
    }).isRequired
  ),
  children: PropTypes.element.isRequired,
};

import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import IMSDashboardLogo from "../../../Images/dashboard-logo.png";
import "./style.css";

export const Layout = ({ menu, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = localStorage.getItem("ims:auth:role") || "";
  const userProfile = JSON.parse(localStorage.getItem("ims:auth:profile"));

  console.log("User role:", userRole);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Determine class names based on user role
  const sidebarClassName =
    userRole === "ADMIN"
      ? "dashboard-sidebar"
      : userRole === "STUDENT"
      ? "student-dashboard-sidebar"
      : userRole === "FACULTY"
      ? "faculty-dashboard-sidebar"
      : "dashboard-sidebar";

  const headerClassName = "dashboard-header";

  const logoClassName =
    userRole === "ADMIN"
      ? "sidebar-logo"
      : userRole === "STUDENT"
      ? "student-sidebar-logo"
      : userRole === "FACULTY"
      ? "faculty-sidebar-logo"
      : "sidebar-logo";

  const navigateToMenu = (url) => {
    navigate(url);
  };

  // Find the current active menu item
  const activeMenuItem = menu.find((m) => m.key === location.pathname);
  const activeMenuLabel = activeMenuItem ? activeMenuItem.label : "Menu Name";

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
          <h3>{activeMenuLabel}</h3>
          <div className="user-info" onClick={() => {}}>
            <div className="user-logo">{userRole ? userRole[0] : "U"}</div>
            <span className="user-name">
              {[userProfile?.firstName, userProfile?.lastName]
                .filter(Boolean)
                .join(" ")}
            </span>
          </div>
          <div className="">
            <span className="logout" onClick={onLogout}>
              Logout
            </span>
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

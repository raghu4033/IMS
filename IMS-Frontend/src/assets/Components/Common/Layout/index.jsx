import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import IMSDashboardLogo from "../../../Images/dashboard-logo.png";
import HanburgerMenu from "../../../Images/menu.png";
import "./style.css";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export const Layout = ({ menu, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setIsOpen] = useState(false);

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
  // const activeMenuItem = menu.find((m) => m.key === location.pathname);
  // const activeMenuLabel = activeMenuItem ? activeMenuItem.label : "Menu Name";

  return (
    <div className="dashboard-container">
      <aside
        className={`${sidebarClassName} ${
          open ? "sidebar-open" : "sidebar-close"
        }`}
      >
        <div
          style={{ width: "100%", textAlign: "right", padding: "10px" }}
          className="sidebar-close-icon"
        >
          <IoCloseOutline
            size={20}
            cursor={"pointer"}
            onClick={() => setIsOpen(false)}
            color="#fff"
            style={{ zIndex: 99999 }}
          />
        </div>
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
          <span
            className="menu-sidebar"
            onClick={() => {
              setIsOpen(!open);
            }}
          >
            <img src={HanburgerMenu} alt="Logo" className="menu-sidebar-icon" />
          </span>
          <h3>
            Greetings, {[userProfile?.firstName].filter(Boolean).join(" ")}{" "}
          </h3>
          <div className="user-info" onClick={() => {}}>
            <div className="user-logo">{userRole ? userRole[0] : "U"}</div>
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

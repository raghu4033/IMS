import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import IMSDashboardLogo from "../../../Images/dashboard-logo.png";
import "./style.css";

export const Layout = ({ menu, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const navigateToMenu = (url) => {
    navigate(url);
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <img src={IMSDashboardLogo} alt="Logo" />
        </div>
        <nav className="sidebar-menu">
          <ul>
            {menu.map((m, index) => {
              console.log(location.pathname === m.url, location.pathname, m.key);
              return (
                <li key={index}>
                  <span
                    onClick={() => navigateToMenu(m.key)}
                    className={location.pathname === m.key ? `active` : ""}
                  >
                    {m.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="user-info" onClick={() => {}}>
            <div className="user-logo">HS</div>
            <span className="user-name">Harshad</span>
            <div className="dropdown-menu">
              <a href="#">Profile</a>
              <a href="#">Change Password</a>
              <a href="#">Logout</a>
            </div>
          </div>
          {/* <div className="address-bar">Your Address Here</div> */}
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

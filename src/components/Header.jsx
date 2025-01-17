import { Link, NavLink } from "react-router-dom";

import classes from "./Header.module.css";
import avatarIcon from "../assets/avatar-icon.png";

export default function Navbar() {
  const activeLink = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <Link className={classes.siteLogo} to="/">
        #VANLIFE
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/host"
              style={({ isActive }) => (isActive ? activeLink : null)}
            >
              Host
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeLink : null)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vans"
              style={({ isActive }) => (isActive ? activeLink : null)}
            >
              Vans
            </NavLink>
          </li>
          <li>
            <Link to="login" className={classes.loginLink}>
              <img src={avatarIcon} className="login-icon" />
            </Link>
          </li>
          <button onClick={fakeLogOut}>X</button>
        </ul>
      </nav>
    </header>
  );
}

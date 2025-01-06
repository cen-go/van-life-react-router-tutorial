import { Link, NavLink } from "react-router-dom";

import classes from "./Header.module.css";

export default function Navbar() {
  const activeLink = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

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
        </ul>
      </nav>
    </header>
  );
}
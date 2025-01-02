import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <Link className={classes.siteLogo} to="/">#VANLIFE</Link>
      <nav>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/vans">Vans</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
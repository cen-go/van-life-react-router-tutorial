import { Link } from "react-router-dom";
import classes from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={classes.notFound}>
      <h2>Page not found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Return to the homepage</Link>
    </section>
  );
}
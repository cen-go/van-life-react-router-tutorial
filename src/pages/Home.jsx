import { Link } from "react-router-dom";

import classes from "./Home.module.css";

export default function Home() {
  return (
    <section className={classes.home}>
      <h1>You got the travel plans, we got the travel vans.</h1>
      <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
      <Link to="/" className={classes.linkButton}>find your van</Link>
    </section>
  )
}
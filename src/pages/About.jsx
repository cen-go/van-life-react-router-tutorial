import { Link } from "react-router-dom";

import classes from "./About.module.css";
import aboutHeroImg from "../assets/about-hero.png";

export default function About() {
  return (
    <section id="about">
      <img src={aboutHeroImg} alt="hero" className={classes.aboutHeroImg} />
      <article className={classes.aboutContent}>
        <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
        <p>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch. (Hitch costs extra 😉)
        </p>
        <p>
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </p>
      </article>
      <div className={classes.aboutCta}>
        <h2>Your destination is waiting. <br />
        Your van is ready.</h2>
        <Link to="/vans" className="link-button">View Vans</Link>
      </div>
    </section>
  );
}

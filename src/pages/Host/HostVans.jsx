import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./HostVans.module.css";

export default function HostVans() {
  const [hostVans, setHostVans] = useState([]);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setHostVans(data.vans);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const hostVansElements = hostVans.map((van) => (
    <Link
      to={van.id}
      key={van.id}
      className={classes.hostVanLinkWrapper}
      aria-label={`link to host van named ${van.name}`}
    >
      <div className={classes.hostVanSingle} key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className={classes.hostVanInfo}>
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className={classes.hostVansTitle}>Your listed vans</h1>
      <div className={classes.hostVansList}>
        {hostVans.length > 0 ? (
          <section>{hostVansElements}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}

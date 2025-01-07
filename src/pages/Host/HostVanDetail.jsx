import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import classes from "./HostVanDetail.module.css";

const activeLink = {
  fontWeight: "bold",
  textDecoration: "underline",
  color: "#161616",
};

export default function HostVanDetail() {
  const { vanId } = useParams();
  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/host/vans/${vanId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setVan(data.vans[0]);
      });
  }, [vanId]);

  if (!van) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={classes.hostVanDetailPage}>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className={classes.hostVanDetailLayoutContainer}>
        <div className={classes.hostVanDetail}>
          <img src={van.imageUrl} alt={`image of ${van.name}`} />
          <div className={classes.hostVanDetailInfoText}>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2>{van.name}</h2>
            <p className={classes.vanPrice}>
              <span>{`$${van.price}`}</span>/day
            </p>
          </div>
        </div>
        <nav className={classes.hostVanDetailTabs}>
          <NavLink
            to="."
            style={({ isActive }) => (isActive ? activeLink : null)}
            end
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeLink : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeLink : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={van} />
      </div>
    </section>
  );
}

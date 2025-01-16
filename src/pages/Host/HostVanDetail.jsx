import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { Suspense } from "react";

import { fetchVan } from "../../api";
import { requireAuth } from "../../util";
import classes from "./HostVanDetail.module.css";

const activeLink = {
  fontWeight: "bold",
  textDecoration: "underline",
  color: "#161616",
};

export async function loader({ params, request }) {
  await requireAuth(request);
  const id = params.vanId;
  return defer({ data: fetchVan(id) });
}

export default function HostVanDetail() {
  const van = useLoaderData();

  return (
    <section className={classes.hostVanDetailPage}>
      <Link to="/host/vans" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className={classes.hostVanDetailLayoutContainer}>
        <Suspense fallback={<div className="loader"></div>}>
          <Await resolve={van.data}>
            {(van) => (
              <>
                <div className={classes.hostVanDetail}>
                  <img src={van.imageUrl} alt={`image of ${van.name}`} />
                  <div className={classes.hostVanDetailInfoText}>
                    <i className={`van-type ${van.type} selected`}>
                      {van.type}
                    </i>
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
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

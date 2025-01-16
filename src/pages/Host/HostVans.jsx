import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import { fetchHostVans } from "../../api";
import { requireAuth } from "../../util";
import classes from "./HostVans.module.css";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: fetchHostVans() });
}

export default function HostVans() {
  const hostVans = useLoaderData();

  function renderVanElements(hostVans) {
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
    return hostVansElements
  }

  return (
    <section>
      <h2 className={classes.hostVansTitle}>Your listed vans</h2>
      <div className={classes.hostVansList}>
        <Suspense fallback={<div className="loader"></div>}>
          <Await resolve={hostVans.vans}>
            {resolvedVans => renderVanElements(resolvedVans)}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}


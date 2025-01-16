import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import { fetchVans } from "../api";

export function loader() {
  return defer({ vans: fetchVans() });
}

export default function VansPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  const vans = useLoaderData();

  const vansListContent = (
    <Await resolve={vans.vans}>
      {(vans) =>
        (typeFilter ? vans.filter((van) => van.type === typeFilter) : vans).map(
          (van) => (
            <article key={van.id} className="van-card">
              <Link
                to={van.id}
                state={{ search: searchParams.toString() }}
                aria-label={`View details for ${van.name} price of ${van.price} per day`}
              >
                <img src={van.imageUrl} alt={`image of ${van.name}`} />
                <div className="van-info">
                  <h3>{van.name}</h3>
                  <p>
                    ${van.price}
                    <span>/day</span>
                  </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
              </Link>
            </article>
          )
        )
      }
    </Await>
  );

  return (
    <section id="vans" className="van-list-container">
      <h2>Explore our van options</h2>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            onClick={() => setSearchParams({})}
            className="van-type clear-filters"
          >
            Clear filters
          </button>
        )}
      </div>
      <Suspense fallback={<div className="loader"></div> }>
        {<div className="van-list">{vansListContent}</div>}
      </Suspense>
    </section>
  );
}

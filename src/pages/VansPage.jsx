import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function VansPage() {
  const [vans, setVans] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    async function fetchVans() {
      setIsFetching(true);
      try {
        const response = await fetch("/api/vans");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        setVans(resData.vans);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.log(error);
      }
    }
    fetchVans();
  }, []);

  const vansListContent = isFetching ? (
    <p>Loading vans...</p>
  ) : (
    (typeFilter ? vans.filter((van) => van.type === typeFilter) : vans).map(
      (van) => (
        <article key={van.id} className="van-card">
          <Link
            to={`/vans/${van.id}`}
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
  );

  return (
    <section id="vans" className="van-list-container">
      <h2>Explore our van options</h2>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
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
      <div className="van-list">{vansListContent}</div>
    </section>
  );
}

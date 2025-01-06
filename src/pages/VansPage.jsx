import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function VansPage() {
  const [vans, setVans] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

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
    vans.map((van) => (
      <article key={van.id} className="van-card">
        <Link to={`/vans/${van.id}`} aria-label={`View details for ${van.name} price of ${van.price} per day`}>
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
    ))
  );

  return (
    <section id="vans" className="van-list-container">
      <h2>Explore our van options</h2>
      <div className="van-list">
        {vansListContent}
      </div>
    </section>
  );
}
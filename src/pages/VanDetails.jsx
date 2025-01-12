import { Link, useLocation, useLoaderData } from "react-router-dom";
import classes from "./VanDetails.module.css";
import { fetchVans } from "../api";

export async function loader({ params }) {
  const id = params.vanId;
  const data = await fetchVans(id);
  return data;
}

export default function VanDetails() {
  const van = useLoaderData();
  const location = useLocation();
  const searchState = location.state?.search ?? "";

  const typeParam = new URLSearchParams(searchState).get("type");

  return (
    <section className={classes.vanDetailContainer}>

      <Link to={`../?${searchState}`} relative="path" className="back-button">
        &larr; <span>Back to {searchState ? typeParam : "all"} vans</span>
      </Link>

      <article className={classes.vanDetail}>
        <img src={van.imageUrl} alt={`image of ${van.name}`} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className={classes.vanPrice}>
          <span>${van.price}</span>
          /day
        </p>
        <p>{van.description}</p>
        <button className={classes.linkButton}>Rent this van</button>
      </article>

    </section>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./VanDetails.module.css";

export default function VanDetails() {
  const [van, setVan] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchVanDetails(vanId) {
      try {
        const response = await fetch(`/api/vans/${vanId}`);
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const { vans: vanData} = resData;
        setVan(vanData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVanDetails(params.vanId);
  }, [params.vanId]);

  return (
    <section className={classes.vanDetailContainer}>
      {van ? (
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
      ) : (
        <h3>Loading van details...</h3>
      )}
    </section>
  );
}
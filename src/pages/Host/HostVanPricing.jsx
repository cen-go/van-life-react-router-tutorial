import { useOutletContext } from "react-router-dom";

import classes from "./HostVanPricing.module.css";

export default function HostVanPricing() {
  const van = useOutletContext();

  return (
    <p className={classes.pricingTabContent}>
      <span>${van.price}</span>/day
    </p>
  );
}

export async function loader() {
  return null;
}
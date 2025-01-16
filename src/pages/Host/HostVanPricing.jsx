import { useOutletContext } from "react-router-dom";

import classes from "./HostVanPricing.module.css";
import { requireAuth } from "../../util";

export default function HostVanPricing() {
  const van = useOutletContext();

  return (
    <p className={classes.pricingTabContent}>
      <span>${van.price}</span>/day
    </p>
  );
}

export async function loader({ request }) {
  await requireAuth(request);
  return null;
}
import { useOutletContext } from "react-router-dom";

import classes from "./HostVanInfo.module.css";

export default function HostVanInfo() {
  const van = useOutletContext();

  return (
    <div className={classes.infoTabContent}>
      <p><span>Name: </span>{van.name}</p>
      <p><span>Category: </span>{van.type}</p>
      <p><span>Description: </span>{van.description}</p>
      <p><span>Visibility: </span></p>
    </div>
  );
}
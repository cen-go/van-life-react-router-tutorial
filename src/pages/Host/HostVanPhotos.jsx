import { useOutletContext } from "react-router-dom";

import classes from "./HostVanPhotos.module.css";

export default function HostVanPhotos() {
  const van = useOutletContext();

  return (
    <div className={classes.hostVanImagesContainer}>
      <img src={van.imageUrl} alt={`image of ${van.name}`} />
    </div>
  );
}
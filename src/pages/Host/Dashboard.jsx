import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs"
import { requireAuth } from "../../util";
import classes from "./Dashboard.module.css"

export default function Dashboard() {
  return (
    <>
      <section className={classes.hostDashboardEarnings}>
        <div className={classes.info}>
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>
      <section className={classes.hostDashboardReviews}>
        <h2>Review score</h2>
        <BsStarFill className={classes.star} />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>
    </>
  );
}

export async function loader({ request }) {
  await requireAuth(request);

  return null;
}

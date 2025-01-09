import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <section className="status-notifier">
      <h2>There was an Error!</h2>
      <p>{error.message} ({error.statusText})</p>
    </section>
  );
}
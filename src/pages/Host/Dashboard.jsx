import { requireAuth } from "../../util";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export async function loader() {
  await requireAuth();

  return null;
}
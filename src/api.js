import { requireAuth } from "./util";

export async function fetchVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const response = await fetch(url);

  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const resData = await response.json();
  return resData.vans;
}

export async function fetchHostVans(id) {
  await requireAuth();

  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const response = await fetch(url);

  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const resData = await response.json();
  return resData.vans;
}

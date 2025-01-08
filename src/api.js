export async function fetchVans() {
  const response = await fetch("/api/vans");

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

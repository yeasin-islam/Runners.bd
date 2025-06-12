export const marathonsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort") || "newest";

  const res = await fetch(`${import.meta.env.VITE_API_URL}/marathons?sort=${sort}`);
  return res.json();
};
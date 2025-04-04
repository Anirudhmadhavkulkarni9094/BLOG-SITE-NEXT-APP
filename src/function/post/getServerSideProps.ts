export async function fetchPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/blog", {
      next: { revalidate: 60 }, // ISR: Refresh every 60s
    });
    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

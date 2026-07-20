export async function getNavCat() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/titles-only`, {
      method: "GET",
      cache: "force-cache", // Enable caching
      next: {
        revalidate: 604800 // 7 days (weekly) - matches your update cycle
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("❌ Error fetching navigation categories:", err);

    // toast only works in client components
    if (typeof window !== 'undefined') {
      const toast = (await import('react-hot-toast')).default;
      toast.error(err.message || "Failed to fetch navigation categories");
    }

    return null; // Return null to handle error gracefully
  }
}
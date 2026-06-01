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

    // Swal only works in client components
    if (typeof window !== 'undefined') {
      const Swal = (await import('sweetalert2')).default;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to fetch navigation categories",
      });
    }

    return null; // Return null to handle error gracefully
  }
}
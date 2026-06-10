export async function vansByStatus(status, page = 1, limit = 9) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/van/van-by-status`);
    url.searchParams.append("status", status);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    // Different cache strategy based on status
    let revalidateTime = 604800; // Default 7 days

    if (status === "available") {
      revalidateTime = 86400; // 1 day for available vans (changes more often)
    } else if (status === "sold") {
      revalidateTime = 2592000; // 30 days for sold vans (rarely changes)
    } else if (status === "pending") {
      revalidateTime = 3600; // 1 hour for pending (changes frequently)
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      // cache: "force-cache",
      // next: {
      //   revalidate: revalidateTime,
      //   tags: ['vans', `vans-status-${status}`, `vans-status-${status}-page-${page}`]
      // },
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data || [],
      hasMore: data.hasMore || false,
      total: data.total || 0,
    };
  } catch (err) {
    console.error("API Fetch Error:", err.message);
    return { success: false, data: [], total: 0, hasMore: false };
  }
}

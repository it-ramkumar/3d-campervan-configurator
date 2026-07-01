export async function vansByStatus(status, page = 1, limit = 9) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/van/van-by-status`);
    url.searchParams.append("status", status);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
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

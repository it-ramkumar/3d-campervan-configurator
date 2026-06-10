/**
 * Fetch vans with pagination
 * @param {number} [page=1] - Page number
 * @param {number} [limit=8] - Number of vans per page
 * @param {string} [search=""] - Search query
 * @returns {Promise<{success: boolean, data?: any, total?: number, page?: number, pages?: number, error?: string}>}
 */
export async function getAllVans(page = 1, limit = 8, search = "") {
  try {
    // Build URL with query parameters
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/van`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());
    if (search) {
      url.searchParams.append("search", search);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      // cache: "force-cache", // Enable caching
      // next: {
      //   revalidate: 604800, // 7 days - matches your update cycle
      //   tags: ['vans', `vans-page-${page}`, search ? `vans-search-${search}` : 'all-vans']
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
      data: data?.vans || [],
      total: data?.total || 0,
      page: data?.page || page,
      pages: data?.pages || 1,
    };
  } catch (err) {
    console.error("Error fetching vans:", err);
    return {
      success: false,
      data: [],
      total: 0,
      page: page,
      pages: 1,
      error: err.message,
    };
  }
}

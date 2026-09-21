/**
 * Fetch paginated blogs with caching - Server Component version
 * @param {number} page - Current page number
 * @param {string} search - Search query
 * @param {string} status - Optional status filter ("Published" for public pages). Omit to get all (admin use).
 * @returns {Promise<{success: boolean, data?: any, pagination?: object}>}
 */
export async function getAllBlogs(page = 1, search = "", status = "") {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/test-blog`);

    url.searchParams.set("page", page.toString());

    if (search) {
      url.searchParams.set("search", search);
    }

    if (status) {
      url.searchParams.set("status", status);
    }

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  } catch (err) {
    console.error("Blog fetch error:", err);

    return {
      success: false,
      data: [],
      pagination: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
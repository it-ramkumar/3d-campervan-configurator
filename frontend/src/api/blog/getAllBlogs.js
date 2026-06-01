/**
 * Fetch paginated blogs with caching - Server Component version
 * @param {number} page - current page number
 * @param {string} search - search query
 * @returns {Promise<{success: boolean, data?: any, pagination?: object}>}
 */
export async function getAllBlogs(page = 1, search = "") {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/test-blog`);
    url.searchParams.append('page', page.toString());
    if (search) {
      url.searchParams.append('search', search);
    }

    const response = await fetch(url.toString(), {
      // Different cache strategies based on whether searching
      ...(search
        ? { cache: 'no-store' } // Don't cache search results (user-specific)
        : {
            cache: 'force-cache',
            next: { revalidate: 604800} // Cache normal pages for 1 hour
          }
      ),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  } catch (err) {
    console.error("Blog fetch error:", err.message);
    return {
      success: false,
      data: [],
      pagination: null,
      error: err.message,
    };
  }
}
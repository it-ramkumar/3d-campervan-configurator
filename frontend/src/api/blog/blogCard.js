/**
 * Fetch paginated blogs with caching - Server Component version
 */
export async function blogCard() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/test-blog/blog-card`,
      {
        cache: 'force-cache', // ✅ This enables Next.js Data Cache
        next: { revalidate: 604800}, // Revalidate every hour
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data,
    };
  } catch (err) {
    console.error("Blog fetch error:", err.message);
    return {
      success: false,
      data: [],
      error: err.message,
    };
  }
}
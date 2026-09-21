export async function linksForNavbar() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/test-blog/blog-links`,
      {
        next: { revalidate: 604800 }, // Revalidate every 7 days
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
    console.error("Navbar blog links error:", err);

    return {
      success: false,
      data: [],
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
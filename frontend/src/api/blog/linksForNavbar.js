export async function linksForNavbar() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/test-blog/blog-links`,
      {
        cache: 'force-cache',  // ✅ Now this works!
        next: { revalidate: 604800} // Optional: Revalidate every hour
      }
    );

    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();

    return {
      success: true,
      data: data.data, // Adjust based on your API response structure
    };
  } catch (err) {
    console.error(err.message);
    return {
      success: false,
      data: [],
      message: err.message
    };
  }
}
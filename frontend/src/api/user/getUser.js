export const getUser = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/quote/all-quotes`, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 3600, // 1 hour for admin data
        tags: ['quotes'] // For manual purge
      },
      credentials: 'include',
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
    console.error("Error fetching quotes:", err);
    throw err;
  }
};
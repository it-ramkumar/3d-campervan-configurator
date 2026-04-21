// @/api/portfolio/getAllPortfolio.js

export async function getAllPortfolio(page = 1, limit = 12, search = "") {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/portfolio`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("search", search);

    const response = await fetch(url.toString(), {
      method: 'GET',
      // 'no-store' se Next.js cache ko bypass karega or har baar fresh data layega
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return {
      success: false,
      error: err.message || "Network Error",
    };
  }
}
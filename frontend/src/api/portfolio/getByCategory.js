export async function getByCategory(
  category,
  page = 1,
  search = "",
  model = "",
  sit,
  sleep,
  bedType,
  bathroomType
) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/portfolio/category`);

    const params = {
      category,
      page,
      limit: 10,
      search,
      model,
      sit: sit,
      sleep: sleep,
      bedType,
      bathroomType
    };

    // Clean undefined values
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });

    // Different cache strategies based on category
    const isSearchActive = search || model || sit || sleep || bedType || bathroomType;

    const response = await fetch(url.toString(), {
      method: "GET",
      // cache: "force-cache",
      // next: {
      //   // Cache regular categories for 7 days, search results for 1 day
      //   revalidate: isSearchActive ? 86400 : 604800, // 1 day vs 7 days
      //   tags: [`category-${category}`, `portfolio-categories`]
      // },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data || [],
      total: data?.total || 0,
      page: data?.page || 1,
      pages: data?.pages || 1,
      filters: data?.filters || {}
    };
  } catch (err) {
    console.error("Error fetching portfolio by category:", err);
    return {
      success: false,
      data: [],
      total: 0,
      page: 1,
      pages: 1,
      filters: {}
    };
  }
}
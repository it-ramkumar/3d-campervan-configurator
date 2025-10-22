import axios from "axios";

export async function getByCategory(categorySlug, page = 1, limit = 2) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/category`,
      {
        params: {
          categorySlug, // category
          page,         // current page
          limit,        // items per page
        },
        withCredentials: true,
      }
    );

    return {
      success: true,
      // return all the useful info your backend sends
      portfolios: response.data?.portfolios || [],
      total: response.data?.total || 0,
      page: response.data?.page || 1,
      pages: response.data?.pages || 1,
    };
  } catch (err) {
    console.error("❌ Error fetching portfolio:", err);
    return {
      success: false,
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}

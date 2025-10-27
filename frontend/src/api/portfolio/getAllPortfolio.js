import axios from "axios";

/**
 * Fetch vans from backend with pagination
 * @param {number} page - current page number
 * @param {number} limit - items per page
 */
export async function getAllPortfolio(page = 1, limit = 30) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio`,
      {
        params: { page, limit }, // ✅ pass page & limit
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data || [],
    };
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return {
      success: false,
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}

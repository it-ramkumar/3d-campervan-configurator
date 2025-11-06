import axios from "axios";

/**
 * Fetch portfolio vans with pagination and optional search
 * @param {number} page - current page number
 * @param {number} limit - items per page
 * @param {string} search - optional search keyword
 */
export async function getAllPortfolio(page = 1, limit = 12, search = "") {
  try {
    console.log("Fetching portfolios...", { search });
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio`,
      {
        params: { page, limit, search },
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return {
      success: false,
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}

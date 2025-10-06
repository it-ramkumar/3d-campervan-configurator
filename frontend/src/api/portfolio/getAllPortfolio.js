import axios from "axios";

/**
 * Fetch all vans from backend
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function getAllPortfolio() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/portfolio`, {
      withCredentials: true,
    });
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

import axios from "axios";
import Swal from "sweetalert2";

/**
 * Fetch vans with pagination
 * @param {number} [page=1] - Page number
 * @param {number} [limit=8] - Number of vans per page
 * @returns {Promise<{success: boolean, data?: any, total?: number, page?: number, pages?: number, error?: string}>}
 */
export async function getAllVans(page = 1, limit = 8) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/van?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );

    const { data } = response;

    return {
      success: true,
      data: data?.data || data?.vans || [],
      total: data?.total || data?.count || 0,
      page: data?.page || page,
      pages: data?.pages || Math.ceil((data?.total || 0) / limit),
    };
  } catch (err) {
    console.error("Error fetching vans:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err?.response?.data?.message || "Failed to fetch vans",
    });
    return {
      success: false,
      error: err?.response?.data?.message || "Failed to fetch vans",
    };
  }
}

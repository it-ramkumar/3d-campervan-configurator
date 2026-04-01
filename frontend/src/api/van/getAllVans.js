import axios from "axios";
/**
 * Fetch vans with pagination
 * @param {number} [page=1] - Page number
 * @param {number} [limit=8] - Number of vans per page
 * @returns {Promise<{success: boolean, data?: any, total?: number, page?: number, pages?: number, error?: string}>}
 */
export async function getAllVans(page = 1, limit = 8, search = "") {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/van?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      { withCredentials: true }
    );

    const { data } = response;

    return {
      success: true,
      data: data?.vans || [],
      total: data?.total || 0,
      page: data?.page || page,
      pages: data?.pages || 1,
    };
  } catch (err) {
    console.error("Error fetching vans:", err);
    return { success: false, error: err.message };
  }
}



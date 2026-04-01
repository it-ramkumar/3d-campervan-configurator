import axios from "axios";
import Swal from "sweetalert2";

/**
 * Fetch paginated blogs
 * @param {number} page - current page number
 * @returns {Promise<{success: boolean, data?: any, pagination?: object}>}
 */
export async function getAllBlogs(page = 1, search = "") {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/test-blog?page=${page}&search=${encodeURIComponent(search)}`,
      { withCredentials: true }
    );

    return {
      success: true,
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.message || "Failed to fetch blogs",
    });
  }
}


import axios from "axios";
import Swal from "sweetalert2";

/**
 * Fetch paginated blogs
 * @param {number} page - current page number
 * @returns {Promise<{success: boolean, data?: any, pagination?: object}>}
 */
export async function blogCard() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/test-blog/blog-card`,
      { withCredentials: true }
    );
    return {
      success: true,
      data: response.data.data,
    };
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.message || "Failed to fetch blogs",
    });
  }
}


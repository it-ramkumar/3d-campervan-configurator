import axios from "axios";
import Swal from "sweetalert2";

/**
 * Fetch vans by status with pagination
 */
export async function vansByStatus(status, page = 1, limit = 9) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/van/van-by-status`,
      {
        params: {
          status,
          page,
          limit,
        },
        withCredentials: true,
      }
    );

 return {
  success: true,
  data: response.data.data,
  hasMore: response.data.hasMore,
  total: response.data.total,
};

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err?.response?.data?.message || "Something went wrong",
    });

    return { success: false };
  }
}

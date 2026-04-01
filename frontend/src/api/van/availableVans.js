import axios from "axios";
import Swal from "sweetalert2";

/**
 * Fetch all vans from backend
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function availableVans() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/van/available`, {
      withCredentials: true,
    });
    return {
      success: true,
      data: response.data.vans || [],
    };
  } catch (err) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });

  }
}

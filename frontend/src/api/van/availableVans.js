import axios from "axios";
import Swal from "sweetalert2";

/**
 * Fetch all vans from backend
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function availableVans() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/van/available`, {
      withCredentials: true,
    });
    return {
      success: true,
      data: response.data.vans || [],
    };
  } catch (err) {
        Swal.fire({
      icon: "Error",
      title: "Error",
      text: err.response.data.message,
    });
    // console.error("Error fetching available vans:", err);
    // return {
    //   success: false,
    //   error: err.response?.data?.message || "Something went wrong",
    // };
  }
}

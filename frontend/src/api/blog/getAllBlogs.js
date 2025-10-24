import axios from "axios";
import Swal from "sweetalert2";

/**
 * Fetch all vans from backend
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function getAllBlogs() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/blog`,{
           withCredentials: true,
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (err) {
        Swal.fire({
      icon: "Error",
      title: "Error",
      text: err.response.data.message,
    });
    // console.error("Error fetching blogs:", err);
    // return {
    //   success: false,
    //   error: err.response?.data?.message || "Something went wrong",
    // };
  }
}

import axios from "axios";
import Swal from "sweetalert2";

export async function getByWheelBase(wheelBase, page = 1, limit = 10) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/wheel-base`,
      {
        params: {
          wheelBase, // wheelBase
          page,         // current page
          limit,        // items per page
        },
        withCredentials: true,
      }
    );
console.log(response.data)
    return {
      success: true,
      // return all the useful info your backend sends
      data: response.data.data || [],
      total: response.data?.total || 0,
      page: response.data?.page || 1,
      pages: response.data?.pages || 1,
    };
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });
    // console.error("❌ Error fetching portfolio:", err);

  }
}

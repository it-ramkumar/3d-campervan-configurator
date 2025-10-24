import axios from 'axios';
import Swal from 'sweetalert2';
export const getBySlug = async (slug) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/van/${slug}`, {
        withCredentials: true,
    });
    return {
      success: true,
      data: response.data.van,
    };
  } catch (error) {
        Swal.fire({
      icon: "Error",
      title: "Error",
      text: error.response.data.message,
    });
    // console.error("Error fetching van by slug:", error);
    // return {
    //   success: false,
    //   error: error.response?.data?.message || "Something went wrong",
    // };
  }
};
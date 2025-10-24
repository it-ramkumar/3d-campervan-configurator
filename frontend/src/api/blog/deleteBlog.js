import axios from "axios";
import Swal from "sweetalert2";
export const deleteBlog = async (slug) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/blog/${slug}`, {
      withCredentials: true,
    });
    Swal.fire({
          icon: "success",
          title: "Delete successfully!",
          text: "Your blog has been Deleted successfully.",
        });
    return res.data;
  } catch (error) {
        Swal.fire({
          icon: "Error",
          title: "Error",
          text: error.response.data.message,
        });
    // console.error("Error deleting blog:", error);
    // alert("Something went wrong while deleting blog!");
    throw error;
  }
};
import axios from "axios";
import Swal from "sweetalert2";
export const deleteVan = async (slug) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/van/${slug}`, {
      withCredentials: true,
    });
        Swal.fire({
          icon: "success",
          title: "Delete successfully!",
          text: "Your Data has been Deleted successfully.",
        });
    // alert("Van deleted successfully!");
    return res.data;
  } catch (error) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message,
    });

    throw error;
  }
};
import axios from "axios";
import Swal from "sweetalert2";
export const deleteVan = async (slug) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/van/${slug}`, {
      withCredentials: true,
    });

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
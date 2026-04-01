// ✅ Delete Portfolio
import axios from "axios";
import Swal from "sweetalert2";
export const deletePortfolio = async (slug) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`, {
      withCredentials: true,
    });
    Swal.fire({
      icon: "success",
      title: "Delete successfully!",
      text: "Your Portfolio has been Deleted successfully.",
      showConfirmButton: false
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
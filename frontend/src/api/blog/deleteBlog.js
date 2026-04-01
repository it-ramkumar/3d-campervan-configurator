import axios from "axios";
import Swal from "sweetalert2";

export const deleteBlog = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/test-blog/${id}`,
      { withCredentials: true }
    );

    Swal.fire({
      icon: "success",
      title: "Deleted Successfully!",
      text: "Your blog has been deleted successfully.",
      timer: 2000,
      showConfirmButton: false,
    });

    return res.data;
  } catch (error) {
    Swal.fire({
      icon: "error", // 🔹 should be lowercase "error"
      title: "error",
      text: error?.response?.data?.message || "Something went wrong!",
    });
    throw error;
  }
};

import axios from "axios";
import Swal from "sweetalert2";
export const deleteUser = async (id) => {

  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/quote/${id}`, {
      withCredentials: true,
    });
    Swal.fire({
          icon: "success",
          title: "Delete successfully!",
          text: "Your User has been Deleted successfully.",
        });
    return res.data;
  } catch (err) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });
    throw err.response?.data || err.message;
  }
};
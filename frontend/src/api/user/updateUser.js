import axios from "axios";
import Swal from "sweetalert2";

export const updateUser = async (id, newStatus) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}/quote/${id}`,
      { status: newStatus }
   , {
      withCredentials: true,
    } );
    Swal.fire({
          icon: "success",
          title: "Delete successfully!",
          text: "Your User has been updated successfully.",
        });

    return res;
  } catch (err) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });
    throw err.response?.data || err.message;
  }
};

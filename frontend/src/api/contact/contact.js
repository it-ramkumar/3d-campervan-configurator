import axios from "axios"
import Swal from "sweetalert2";
export const contact = async (formData) => {
  try {
    const tracking =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("tracking")) || {}
        : {};

    const payload = { ...formData, ...tracking };

    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/contact`, payload, {
      withCredentials: true,
    })
        // Swal.fire({
        //   icon: "success",
        //   title: "successfully!",
        //   text: "Your contant has been submitted successfully.",
        // });
    return res.data
  } catch (error) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message,
    });
    throw error.response?.data || { message: "Something went wrong" }
  }
}
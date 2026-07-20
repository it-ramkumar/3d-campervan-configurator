import axios from "axios"
import toast from "react-hot-toast";
export const contact = async (formData) => {
  try {
    const tracking =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("tracking")) || {}
        : {};

    const payload = { ...formData, ...tracking };

    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/contact`, payload, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response?.data || { message: "Something went wrong" }
  }
}
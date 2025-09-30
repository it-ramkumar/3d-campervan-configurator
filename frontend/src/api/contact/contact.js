import axios from "axios"
export const contact = async (formData) => {
  try {

    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/contact`, formData)
    return res.data
  } catch (error) {
    console.error("Insert error:", error)
    throw error.response?.data || { message: "Something went wrong" }
  }
}
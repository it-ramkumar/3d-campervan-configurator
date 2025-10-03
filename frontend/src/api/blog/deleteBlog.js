import axios from "axios";
export const deleteBlog = async (slug) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/blog/${slug}`);
    alert("Blog deleted successfully!");
    return res.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    alert("Something went wrong while deleting blog!");
    throw error;
  }
};
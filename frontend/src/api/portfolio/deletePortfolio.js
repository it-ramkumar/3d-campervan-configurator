// ✅ Delete Portfolio
import axios from "axios";
export const deletePortfolio = async (slug) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/${slug}`, {
      withCredentials: true,
    });
    alert("Portfolio deleted successfully!");
    return res.data;
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    alert("Something went wrong while deleting portfolio!");
    throw error;
  }
};
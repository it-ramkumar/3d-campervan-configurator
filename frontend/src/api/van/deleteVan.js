import axios from "axios";
export const deleteVan = async (slug) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/van/${slug}`, {
      withCredentials: true,
    });
    alert("Van deleted successfully!");
    return res.data;
  } catch (error) {
    console.error("Error deleting van:", error);
    alert("Something went wrong while deleting van!");
    throw error;
  }
};
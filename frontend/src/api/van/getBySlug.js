import axios from 'axios';
export const getBySlug = async (slug) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/van/${slug}`, {
        withCredentials: true,
    });
    return {
      success: true,
      data: response.data.van,
    };
  } catch (error) {
    console.error("Error fetching van by slug:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
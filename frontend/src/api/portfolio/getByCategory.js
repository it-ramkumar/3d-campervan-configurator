import axios from "axios";

export async function getByCategory(categorySlug) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/category`,
      {
        params: { categorySlug }, // ✅ send as query param
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data || [],
    };
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return {
      success: false,
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}

import axios from "axios";
export async function getByCategory(
  category,
  page = 1,
  search = "",
  model = "",
  sit,
  sleep,
  bedType,
  bathroomType
) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/category`,
      {
        params: {
          category,
          page,
          limit: 10,
          search,
          model,
          sit: sit,  // backend expects sit
          sleep: sleep ,// backend expects sleep
          bedType,
          bathroomType
        },
        withCredentials: true
      }
    );
    console.log("Response:", response.data,"filtered data");

    return {
      success: true,
      data: response.data.data || [],
      total: response.data?.total || 0,
      page: response.data?.page || 1,
      pages: response.data?.pages || 1,
      filters: response.data?.filters || {}
    };
  } catch (err) {
    console.error("Error fetching portfolio:", err);
  }
}

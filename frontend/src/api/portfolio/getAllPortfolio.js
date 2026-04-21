import axios from "axios";

export async function getAllPortfolio(page = 1, limit = 12, search = "") {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/portfolio`,
      {
        params: {
          page,
          limit,
          search,
          t: Date.now(),
        },
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.error("Error fetching portfolio:", err);

    return {
      success: false,
      error: err.message || "Network Error",
    };
  }
}
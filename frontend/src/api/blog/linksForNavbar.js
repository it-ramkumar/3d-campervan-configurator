import axios from "axios";
/**
 * Fetch blog links for navbar
 * @returns {Promise<{success: boolean, data: any}>}
 */
export async function linksForNavbar() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/test-blog/blog-links`,
    );

    // Backend { success: true, data: [...] } bhej raha hai
    // Axios khud ka ek .data object rakhta hai
    return {
      success: true,
      data: response.data.data, // Check karein agar backend data property mein list bhej raha hai
    };
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Failed to fetch blogs";
    console.error(errorMsg);

    // YE RETURN ZAROORI HAI: Taake frontend ko undefined ki jagah object mile
    return {
      success: false,
      data: [], // Khali array bhejein taake .map() crash na ho
      message: errorMsg
    };
  }
}
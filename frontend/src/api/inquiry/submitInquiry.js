// api.js
import axios from "axios";

export const submitInquiry = async (formData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/inquery`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return { success: true, data };
  } catch (error) {
    console.error("API Error:", error);

    // Custom error message
    let message = "Something went wrong. Please try again.";
    if (error.response) {
      message = error.response.data?.message || "Server error occurred.";
    } else if (error.request) {
      message = "No response from server. Check your connection.";
    }

    return { success: false, message };
  }
};

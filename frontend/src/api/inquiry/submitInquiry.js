
import axios from "axios";
export const submitInquiry = async (formData) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/inquery`, formData);
    return { success: true, data };
  } catch (error) {
    console.log(error.response)
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
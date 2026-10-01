import axios from "axios";
import { withTracking } from "@/lib/track";

// Resolves only when the API confirms the lead was saved; throws an Error with .status otherwise.
export const contact = async (formData) => {
  let res;
  try {
    res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/contact`, withTracking(formData), {
      withCredentials: true,
    });
  } catch (error) {
    const data = error.response?.data;
    const err = new Error(data?.message || data?.error || "We couldn't send your message.");
    err.status = error.response?.status ?? 0;
    throw err;
  }

  if (res.data?.success === false) {
    const err = new Error(res.data.message || res.data.error || "We couldn't send your message.");
    err.status = res.status;
    throw err;
  }

  return res.data;
};

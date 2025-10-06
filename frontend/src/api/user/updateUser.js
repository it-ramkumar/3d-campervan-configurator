import axios from "axios";

export const updateUser = async (id, newStatus) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/quote/${id}`,
      { status: newStatus }
   , {
      withCredentials: true,
    } );

    // console.log("🔄 response:", res);
    // console.log("✅ sent body:", { status: newStatus });

    return res;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

import axios from "axios";
export const deleteUser = async (id) => {

  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/quote/${id}`, {
      withCredentials: true,
    });

    return res.data.message;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
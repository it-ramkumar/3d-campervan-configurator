import axios from "axios";

export const getUser = async () => {

  try {
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/quote/all-quotes`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
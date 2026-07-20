import axios from "axios";

export const deleteUser = async (id) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/quote/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
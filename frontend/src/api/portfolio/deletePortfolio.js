// ✅ Delete Portfolio
import axios from "axios";
export const deletePortfolio = async (slug) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`, {
    withCredentials: true,
  });

  return res.data;
};
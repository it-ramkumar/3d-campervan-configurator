import axios from "axios";

export const deleteVan = async (slug) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/van/${slug}`, {
    withCredentials: true,
  });

  return res.data;
};
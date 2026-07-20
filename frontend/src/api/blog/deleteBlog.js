import axios from "axios";

export const deleteBlog = async (id) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_URL}/test-blog/${id}`,
    { withCredentials: true }
  );

  return res.data;
};

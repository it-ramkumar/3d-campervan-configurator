import axios from "axios";

export const updateUser = async (id, newStatus) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/quote/${id}`,
    { status: newStatus },
    { withCredentials: true }
  );

  return res;
};

import axios from "axios";
import toast from "react-hot-toast";

export const createModel = async (formData) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/models/add`, formData, {
      withCredentials: true,
    });
    toast.success("Your data has been successfully.");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);
    console.error(err);
    throw err;
  }
};


export const updateModel = async (editData, formData) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/models/edit/${editData._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ same reason as above
      },
      withCredentials: true,
    });
    toast.success("Your data has been updated successfully.");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);
    // console.error(err);
    throw err;
  }
};

import axios from "axios";
import Swal from "sweetalert2";

export const createModel = async (formData) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/models/add`, formData, {
      withCredentials: true,
    });
    Swal.fire({
          icon: "success",
          title: "successfully!",
          text: "Your data has been successfully.",
        });
    return res.data;
  } catch (err) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });
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
    Swal.fire({
          icon: "success",
          title: " successfully!",
          text: "Your data has been updated successfully.",
        });
    return res.data;
  } catch (err) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });
    // console.error(err);
    throw err;
  }
};

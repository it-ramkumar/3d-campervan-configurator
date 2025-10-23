import axios from "axios";

export const createModel = async (formData) => {
  console.log(formData,"forData")
  try {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/models/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const updateModel = async (editData, formData) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/models/edit/${editData._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ same reason as above
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

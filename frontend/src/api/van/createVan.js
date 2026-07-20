import axios from "axios";
import toast from "react-hot-toast";


// ✅ Create Van
const createVan = async (formDataToSend) => {

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/van`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,

    });

    toast.success("Your van has been submitted successfully.");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);

    throw error;
  }
};

const updateVan = async (editData, formDataToSend) => {
  // console.log("updateVan called with slug:", editData);

  try {

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}/van/${editData}`,
      formDataToSend,
      { withCredentials: true } // keep cookie session
    );
    toast.success("Updated.");

    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);

    throw error;
  }
};

export { createVan, updateVan };

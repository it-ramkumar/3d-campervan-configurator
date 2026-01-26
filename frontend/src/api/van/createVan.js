import axios from "axios";
import Swal from "sweetalert2";


// ✅ Create Van
const createVan = async (formDataToSend) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/van`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,

    });

    Swal.fire({
      icon: "success",
      title: "van Submitted!",
      text: "Your van has been submitted successfully.",
      showConfirmButton: false
    });
    return res.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "error",
      text: error.response.data.message,
    });

    throw error;
  }
};

const updateVan = async (editData, formDataToSend) => {
  try {

    const res = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/van/${editData.slug}`,
      formDataToSend,
      { withCredentials: true } // keep cookie session
    );
    Swal.fire({
      icon: "success",
      title: "Successfully!",
      text: "Updated.",
      showConfirmButton: false
    });

    return res.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "error",
      text: error.response.data.message,
    });

    throw error;
  }
};

export { createVan, updateVan };

// api.js
import axios from "axios";
import Swal from "sweetalert2";

export const submitInquiry = async (formData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/inquery`, formData, {
      withCredentials: true,
    });

    console.log(data)
        Swal.fire({
          icon: "success",
          title: "Successfully!",
          text:data.message,
        });
    return { success: true, data };
  } catch (error) {
        Swal.fire({
      icon: "Error",
      title: "Error",
      text: error.response.data.message,
    });

  }
};

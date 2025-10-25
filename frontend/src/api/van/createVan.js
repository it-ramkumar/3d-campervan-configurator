import axios from "axios";
import Swal from "sweetalert2";


// ✅ Create Van
const createVan = async (formDataToSend) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/van`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,

    });
    alert("Van created successfully!");
    // console.log("✅ Create Response:", res.data);
    return res.data;
  } catch (error) {
      Swal.fire({
      icon: "Error",
      title: "Error",
      text: error.response.data.message,
    });

    // console.log("❌ Error creating van:", error.response.data.message);
    // alert("Something went wrong while creating van!");
    throw error;
  }
};

const updateVan = async (editData, formDataToSend) => {
  try {
    // if (!editData?._id) throw new Error("No van ID to update!");

    // for (let pair of formDataToSend.entries()) {
    //   console.log(pair[0] + ": ", pair[1]);
    // }

    const res = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/van/${editData.slug}`,
      formDataToSend,
      { withCredentials: true } // keep cookie session
    );
    Swal.fire({
          icon: "success",
          title: "Successfully!",
          text: "Your Data has been successfully Submitted.",
        });
    alert("Van updated successfully!");
    // console.log("✅ Update Response:", res.data);
    return res.data;
  } catch (error) {
        Swal.fire({
      icon: "Error",
      title: "Error",
      text: error.response.data.message,
    });
    // console.error("❌ Error updating van:", error);
    // alert("Something went wrong while updating van!");
    throw error;
  }
};

export { createVan, updateVan };

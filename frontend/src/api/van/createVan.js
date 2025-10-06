import axios from "axios";

// ✅ Create Van
const createVan = async (formDataToSend) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/van`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,

    });
    alert("Van created successfully!");
    console.log("✅ Create Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating van:", error);
    alert("Something went wrong while creating van!");
    throw error;
  }
};

// ✅ Update Van
const updateVan = async (editData, formDataToSend) => {
  try {
    if (!editData?._id) throw new Error("No van ID to update!");
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/van/${editData.slug}`,
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    alert("Van updated successfully!");
    console.log("✅ Update Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error updating van:", error);
    alert("Something went wrong while updating van!");
    throw error;
  }
};
export { createVan, updateVan };

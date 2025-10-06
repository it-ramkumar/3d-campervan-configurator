import axios from "axios";
export const updateBlog = async (editData, formDataToSend) => {
  try {
    if (!editData?._id) throw new Error("No blog ID to update!");
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/blog/with-blocks/${editData.slug}`,
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },

        withCredentials: true,
      });
    alert("Van updated successfully!");
    console.log("✅ Update Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error updating van:", error);
    alert("Something went wrong while updating van!");
    throw error;
  }
};
// blogApi.js
import axios from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true, // ✅ send cookies
};

/**
 * CREATE a new blog
 * @param {FormData} formData
 */
export const createBlog = async (formData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/blog/with-blocks`,
      formData,
      config
    );
    alert("✅ Blog created!");
    return res.data;
  } catch (err) {
    console.error(err);
    alert("❌ Blog creation failed!");
    throw err;
  }
};

/**
 * UPDATE an existing blog
 * @param {string} blogId - ID of the blog to update
 * @param {FormData} formData
 */
export const updateBlog = async (blogId, formData) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/blog/with-blocks/${blogId}`,
      formData,
      config
    );
    alert("✅ Blog updated!");
    return res.data;
  } catch (err) {
    console.error(err);
    alert("❌ Blog update failed!");
    throw err;
  }
};

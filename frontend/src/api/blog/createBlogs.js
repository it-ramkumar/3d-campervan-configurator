// blogApi.js
import axios from "axios";
import Swal from "sweetalert2";

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
       Swal.fire({
      icon: "success",
      title: "Blog Submmited!",
      text: "Your blog has been submit successfully.",
    });
    return res.data;
  } catch (err) {
       Swal.fire({
      icon: "Error",
      title: "Error",
      text: err.response.data.message,
    });

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
    Swal.fire({
      icon: "success",
      title: "Blog Updated!",
      text: "Your blog has been updated successfully.",
    });
    return res.data;
  } catch (err) {
      Swal.fire({
      icon: "warning",
      title: "warning",
      text: err.response.data.message,
    });

    throw err;
  }
};

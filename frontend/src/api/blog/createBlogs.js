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
      `${process.env.NEXT_PUBLIC_URL}/test-blog`,
      formData,
      config
    );
    Swal.fire({
      icon: "success",
      title: "Blog Submitted!",
      text: "Your blog has been submit successfully.",
      showConfirmButton: false
    });
    return res.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "error",
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
      `${process.env.NEXT_PUBLIC_URL}/test-blog/${blogId}`,
      formData,
      config
    );
    Swal.fire({
      icon: "success",
      title: "Blog Updated!",
      text: "Your blog has been updated successfully.",
      showConfirmButton: false
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

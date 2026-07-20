// blogApi.js
import axios from "axios";
import toast from "react-hot-toast";

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
    toast.success("Your blog has been submit successfully.");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);

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
    toast.success("Your blog has been updated successfully.");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);

    throw err;
  }
};

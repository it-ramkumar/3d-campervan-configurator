// src/api/modelService.js
import axios from "axios"


// Insert Many
export const insertManyData = async (formData) => {
  try {
    const payload = [formData] // API expects array
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/insertManyData`, payload)
    return res
  } catch (error) {
    console.error("Insert error:", error)
    throw error.response?.data || { message: "Something went wrong" }
  }
}

// ✅ Update Item
export const updateItem = async (id, updatedData) => {

  try {
    const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/insertManyData/${id}`, updatedData);
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// ✅ Delete Item
export const deleteItem = async (id) => {

  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/insertManyData/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
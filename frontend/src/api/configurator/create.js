
export const createModel = async (formData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/models/add`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Update an existing model
 */
export const updateModel = async (editData, formData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/models/edit/${editData._id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
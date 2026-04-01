
export const removeArrayItem = (field, index,setFormData) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

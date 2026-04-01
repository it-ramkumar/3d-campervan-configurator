 export const handleArrayItemChange = (field, index, key, value,setFormData) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      if (key) {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      } else {
        updatedArray[index] = value;
      }
      return { ...prev, [field]: updatedArray };
    });
  };
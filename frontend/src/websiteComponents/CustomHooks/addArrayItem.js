export  const addArrayItem = (field, newItem, setFormData) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], newItem] }));
  };

 export  const handleInputChange = (e, path,setFormData) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (path) {
      const pathParts = path.split(".");
      setFormData((prev) => {
        const newData = JSON.parse(JSON.stringify(prev));
        let current = newData;
        for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
        }
        const lastKey = pathParts[pathParts.length - 1];
        if (typeof current[lastKey] === "object" && current[lastKey] !== null && name) {
          current[lastKey] = { ...(current[lastKey] || {}), [name]: fieldValue };
        } else {
          current[lastKey] = fieldValue;
        }
        return newData;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    }
  };

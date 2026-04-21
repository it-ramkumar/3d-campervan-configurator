 export  const removeExistingGalleryImage = (index,existingGallery,setRemovedExistingGallery,setExistingGallery) => {
    const urlToRemove = existingGallery[index];
    setRemovedExistingGallery((prev) => [...prev, urlToRemove]);
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };
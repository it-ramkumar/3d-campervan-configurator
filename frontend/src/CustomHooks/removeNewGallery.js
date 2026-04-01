

export  const removeNewGalleryImage = (index,setGalleryFiles,setGalleryPreviews,galleryPreviews) => {
    try { URL.revokeObjectURL(galleryPreviews[index]); } catch (e) {}
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };
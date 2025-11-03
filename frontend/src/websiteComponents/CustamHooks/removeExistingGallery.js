export const removeExistingGalleryImage = (index, setGallery, setRemovedGallery, gallery) => {
  const imageToRemove = gallery[index];
  console.log("Gallery before remove:", gallery);
  console.log("Removed image URL:", imageToRemove.url);

  if (imageToRemove.url) {
    // Track removed images for backend deletion
    setRemovedGallery((prev) => [...prev, imageToRemove.url]);
  }

  // Remove from gallery array
  setGallery((prev) => prev.filter((_, i) => i !== index));
};

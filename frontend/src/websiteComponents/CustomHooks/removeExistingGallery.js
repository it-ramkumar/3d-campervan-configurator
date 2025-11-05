// Remove existing gallery image
export const removeExistingGalleryImage = (index, setGallery, setRemovedGallery, gallery) => {
  const imageToRemove = gallery[index];
  if (imageToRemove.url) {
    setRemovedGallery(prev => [...prev, imageToRemove.url]);
  }
  setGallery(prev => prev.filter((_, i) => i !== index));
};
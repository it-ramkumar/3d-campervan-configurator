// ✅ Remove new gallery image
export const removeNewGalleryImage = (index, setGalleryFiles, galleryFiles) => {
  const imageToRemove = galleryFiles[index];

  console.log("New Gallery before remove:", galleryFiles);
  console.log("Removing new image preview:", imageToRemove.preview);

  // Revoke object URL
  if (imageToRemove.preview) {
    URL.revokeObjectURL(imageToRemove.preview);
  }

  setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
};


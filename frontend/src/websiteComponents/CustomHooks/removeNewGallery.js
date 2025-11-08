
// // Remove new gallery image
// export const removeNewGalleryImage = (index, setGalleryFiles, galleryFiles) => {
//   const imageToRemove = galleryFiles[index];
//   if (imageToRemove.preview) {
//     URL.revokeObjectURL(imageToRemove.preview);
//   }
//   setGalleryFiles(prev => prev.filter((_, i) => i !== index));
// };

export  const removeNewGalleryImage = (index,setGalleryFiles,setGalleryPreviews,galleryPreviews) => {
    try { URL.revokeObjectURL(galleryPreviews[index]); } catch (e) {}
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };
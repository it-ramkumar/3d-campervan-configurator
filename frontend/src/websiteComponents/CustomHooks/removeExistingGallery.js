// // Remove existing gallery image
// export const removeExistingGalleryImage = (index, setGallery, setRemovedGallery, gallery) => {
//   const imageToRemove = gallery[index];
//   if (imageToRemove.url) {
//     setRemovedGallery(prev => [...prev, imageToRemove.url]);
//   }
//   setGallery(prev => prev.filter((_, i) => i !== index));
// };



 export  const removeExistingGalleryImage = (index,existingGallery,setRemovedExistingGallery,setExistingGallery) => {
    const urlToRemove = existingGallery[index];
    setRemovedExistingGallery((prev) => [...prev, urlToRemove]);
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };
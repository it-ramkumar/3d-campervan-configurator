// // Handle gallery change
// export const handleGalleryChange = (event, setGalleryFiles) => {
//   const files = Array.from(event.target.files);

//   const newGalleryFiles = files.map(file => ({
//     file,
//     preview: URL.createObjectURL(file),
//     url: ""
//   }));

//   setGalleryFiles(prev => [...prev, ...newGalleryFiles]);
//   event.target.value = ""; // Reset input
// };

 export const handleGalleryChange = (e,setGalleryFiles,setGalleryPreviews) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };
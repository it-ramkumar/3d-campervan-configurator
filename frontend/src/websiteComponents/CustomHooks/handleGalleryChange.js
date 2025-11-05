// Handle gallery change
export const handleGalleryChange = (event, setGalleryFiles) => {
  const files = Array.from(event.target.files);

  const newGalleryFiles = files.map(file => ({
    file,
    preview: URL.createObjectURL(file),
    url: ""
  }));

  setGalleryFiles(prev => [...prev, ...newGalleryFiles]);
  event.target.value = ""; // Reset input
};
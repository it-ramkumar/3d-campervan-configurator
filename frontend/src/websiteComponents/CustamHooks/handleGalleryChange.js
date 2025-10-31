 // ✅ FIXED: Handle gallery upload
  export const handleGalleryChange = (e, setGalleryFiles) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newGalleryFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      url: ""
    }));

    setGalleryFiles((prev) => [...prev, ...newGalleryFiles]);
  };
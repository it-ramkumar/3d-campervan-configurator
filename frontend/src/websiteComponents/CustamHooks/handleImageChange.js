 // ✅ FIXED: Handle image change in blocks
 export  const handleImageChange = (blockIndex, file, setBlocks) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const block = {
        ...newBlocks[blockIndex],
        file,
        preview,
        url: "" // Clear existing URL when new file is selected
      };
      newBlocks[blockIndex] = block;
      return newBlocks;
    });
  };

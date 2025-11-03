
// ✅ FIXED: Handle image change in blocks
export const handleImageChange = (blockIndex, file, setBlocks) => {
  if (!file) return;

  const preview = URL.createObjectURL(file);
  setBlocks((prev) => {
    const newBlocks = [...prev];
    const block = {
      ...newBlocks[blockIndex],
      file,
      preview,
      url: null // ✅ FIXED: Changed from "" to null - preserves existing images properly
    };
    newBlocks[blockIndex] = block;
    return newBlocks;
  });
};
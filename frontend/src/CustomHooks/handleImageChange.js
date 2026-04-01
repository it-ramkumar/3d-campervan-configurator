// ✅ FIXED: Handle image change for blocks - Preserve existing URL
export const handleImageChange = (blockIndex, file, setBlocks) => {
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };

    // Clean up previous preview if it was a blob URL
    if (block.preview && block.preview.startsWith('blob:')) {
      URL.revokeObjectURL(block.preview);
    }

    block.file = file;
    block.preview = previewUrl;
    // ✅ FIX: Don't clear existing URL, keep it for reference
    // block.url remains unchanged so backend knows which image to replace

    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

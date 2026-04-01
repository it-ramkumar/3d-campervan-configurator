// Remove block
export const removeBlock = (index, setBlocks) => {
  setBlocks(prev => prev.filter((_, i) => i !== index));
};


// Add pros or cons
export const addProsOrCons = (blockIndex, type, setBlocks) => {
  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };
    block[type] = [...(block[type] || []), ""];
    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};
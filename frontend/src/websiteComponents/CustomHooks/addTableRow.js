// Add table row
export const addTableRow = (blockIndex, setBlocks) => {
  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };
    const columns = block.rows[0]?.length || 2;
    const newRow = Array(columns).fill("");
    block.rows = [...block.rows, newRow];
    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};
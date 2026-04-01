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


// Add a new column to a table block
export const addTableColumn = (blockIndex, setBlocks) => {
  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };

    // Loop through each row and add an empty cell
    block.rows = block.rows.map(row => [...row, ""]);

    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

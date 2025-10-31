  // Add table row
 export const addTableRow = (blockIndex, setBlocks) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const block = {
        ...newBlocks[blockIndex],
        rows: [...newBlocks[blockIndex].rows, ["", ""]]
      };
      newBlocks[blockIndex] = block;
      return newBlocks;
    });
  };

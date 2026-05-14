export const handleBlockChange = (
  blockIndex,
  field,
  value,
  rowIndex,
  colIndex,
  setBlocks
) => {
  setBlocks((prev) => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };

    if (field === "table" && rowIndex !== null && colIndex !== null) {
      // Table
      const updatedRows = block.rows.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) =>
              cIdx === colIndex ? value : cell
            )
          : row
      );

      block.rows = updatedRows;

    } else if (
      (field === "pros" || field === "cons" || field === "items") &&
      rowIndex !== null
    ) {
      // Pros / Cons / List Items
      const updatedArray = [...(block[field] || [])];
      updatedArray[rowIndex] = value;
      block[field] = updatedArray;

    } else {
      // Normal fields
      block[field] = value;
    }

    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};
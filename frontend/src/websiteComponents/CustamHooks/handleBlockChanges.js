 // ✅ FIXED: Handle text change in block
 export const handleBlockChange = (blockIndex, key, value, nestedIndex, nestedColIndex,setBlocks) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const block = { ...newBlocks[blockIndex] };

      if (key === "pros") {
        const pros = [...(block.pros || [])];
        pros[nestedIndex] = value;
        block.pros = pros;
      } else if (key === "cons") {
        const cons = [...(block.cons || [])];
        cons[nestedIndex] = value;
        block.cons = cons;
      } else if (key === "table") {
        const rows = block.rows.map((row, rIdx) =>
          rIdx === nestedIndex
            ? row.map((cell, cIdx) => (cIdx === nestedColIndex ? value : cell))
            : row
        );
        block.rows = rows;
      } else {
        block[key] = value;
      }

      newBlocks[blockIndex] = block;
      return newBlocks;
    });
  };
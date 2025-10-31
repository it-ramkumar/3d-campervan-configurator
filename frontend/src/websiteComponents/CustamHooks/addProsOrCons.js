 export const addProsOrCons = (blockIndex, type, setBlocks) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const block = { ...newBlocks[blockIndex] };
      if (type === "pros") block.pros = [...(block.pros || []), ""];
      if (type === "cons") block.cons = [...(block.cons || []), ""];
      newBlocks[blockIndex] = block;
      return newBlocks;
    });
  };
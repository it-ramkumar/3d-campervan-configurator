export const addBlock = (type, setBlocks, insertIndex = null) => {
  const newBlock = { type };

  switch (type) {
    case "heading":
    case "subheading":
    case "paragraph":
      newBlock.text = "";
      break;
    case "image":
      newBlock.file = null;
      newBlock.preview = "";
      newBlock.url = "";
      break;
    case "table":
      newBlock.rows = [["", ""]];
      break;
    case "proscons":
      newBlock.pros = [""];
      newBlock.cons = [""];
      break;
    // ✅ Yeh naya case add karein
    case "list":
      newBlock.items = [""]; // ✅ Yeh line hona zaroori hai
      break;
    default:
      break;
  }

  setBlocks(prev => {
    if (insertIndex !== null) {
      const newBlocks = [...prev];
      newBlocks.splice(insertIndex + 1, 0, newBlock);
      return newBlocks;
    }
    return [...prev, newBlock];
  });
};
// ✅ addBlock.js
export const addBlock = (type, setBlocks, index = null) => {
  let newBlock;

  switch (type) {
    case "paragraph":
      newBlock = { type, text: "" };
      break;
    case "heading":
      newBlock = { type, text: "" };
      break;
    case "subheading":
      newBlock = { type, text: "" };
      break;
    case "image":
      newBlock = { type, file: null, preview: "", url: "" };
      break;
    case "table":
      newBlock = { type, rows: [["", ""], ["", ""]] };
      break;
    case "proscons":
      newBlock = { type, pros: [""], cons: [""] };
      break;
    default:
      return;
  }

  setBlocks((prev) => {
    const newBlocks = [...prev];
    if (index !== null) {
      // Insert at specific position
      newBlocks.splice(index + 1, 0, newBlock);
    } else {
      // Add to end
      newBlocks.push(newBlock);
    }
    return newBlocks;
  });
};

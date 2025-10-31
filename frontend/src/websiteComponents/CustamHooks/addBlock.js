export const addBlock = (type, setBlocks) => {
  let newBlock;

  switch (type) {
    case "paragraph":
      newBlock = { type, text: "" };
      break;
    case "heading":
      newBlock = { type, text: "" };
      break;
    case "subheading": // ✅ Added new block type
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

  setBlocks((prev) => [...prev, newBlock]);
};

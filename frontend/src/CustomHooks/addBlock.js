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
    case "button":
      newBlock.buttonText = "";
      newBlock.buttonUrl = "";
      newBlock.buttonStyle = "primary";
      break;
    case "faq":
      newBlock.faqs = [{ question: "", answer: "" }];
      break;
    case "divider":
      // Divider ko koi extra field nahi chahiye
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
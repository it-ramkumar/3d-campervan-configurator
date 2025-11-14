// Custom Hook / Utility
export const addMediaLinkBlock = (setBlocks, index = null) => {
  const newBlock = {
    type: "mediaLink", // naya type
    url: "",           // string ke liye
  };

  setBlocks(prev => {
    const updated = [...prev];
    if (index !== null) {
      updated.splice(index + 1, 0, newBlock); // insert after current block
    } else {
      updated.push(newBlock); // end me add
    }
    return updated;
  });
};

// FAQ block ke liye helpers: question/answer pairs add/remove/edit karna

export const addFaqItem = (blockIndex, setBlocks) => {
  setBlocks((prev) => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };
    block.faqs = [...(block.faqs || []), { question: "", answer: "" }];
    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

export const removeFaqItem = (blockIndex, faqIndex, setBlocks) => {
  setBlocks((prev) => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };
    block.faqs = (block.faqs || []).filter((_, idx) => idx !== faqIndex);
    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

export const handleFaqChange = (blockIndex, faqIndex, field, value, setBlocks) => {
  setBlocks((prev) => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };
    const updatedFaqs = [...(block.faqs || [])];
    updatedFaqs[faqIndex] = { ...updatedFaqs[faqIndex], [field]: value };
    block.faqs = updatedFaqs;
    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

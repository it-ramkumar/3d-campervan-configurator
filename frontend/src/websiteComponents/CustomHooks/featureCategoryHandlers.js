

// Handle category / item change
export const handleFeatureChange = (
  setFeatures,
  fIndex,
  field,
  value,
  itemIndex = null
) => {
  setFeatures(prev =>
    prev.map((feature, i) => {
      if (i !== fIndex) return feature;

      if (field === "category") {
        return { ...feature, category: value };
      }

      if (field === "item" && itemIndex !== null) {
        const items = [...feature.items];
        items[itemIndex] = value;
        return { ...feature, items };
      }

      return feature;
    })
  );
};

// Add item in feature category
export const addFeatureItem = (setFeatures, fIndex) => {
  setFeatures(prev =>
    prev.map((feature, i) =>
      i === fIndex
        ? { ...feature, items: [...feature.items, ""] }
        : feature
    )
  );
};

// Remove whole feature category
export const removeFeatureCategory = (setFeatures, index) => {
  setFeatures(prev => prev.filter((_, i) => i !== index));
};

// Remove single item
export const removeFeatureItem = (setFeatures, fIndex, iIndex) => {
  setFeatures(prev =>
    prev.map((feature, i) =>
      i === fIndex
        ? {
            ...feature,
            items: feature.items.filter((_, idx) => idx !== iIndex)
          }
        : feature
    )
  );
};

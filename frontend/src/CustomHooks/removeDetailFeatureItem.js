  export const removeDetailedFeatureItem = (featureIndex, itemIndex,setFormData) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: updatedFeatures[featureIndex].items.filter((_, i) => i !== itemIndex),
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };

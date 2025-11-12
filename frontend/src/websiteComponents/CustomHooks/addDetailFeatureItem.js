 export const addDetailedFeatureItem = (featureIndex,setFormData) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: [...updatedFeatures[featureIndex].items, ""],
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };
 export const handleDetailedFeatureItemChange = (featureIndex, itemIndex, value,setFormData) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: updatedFeatures[featureIndex].items.map((item, i) => (i === itemIndex ? value : item)),
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };
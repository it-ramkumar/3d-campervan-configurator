
export const goToPrevStep = (setCurrentStep, currentStep) => {
  if (currentStep > 0) {
    setCurrentStep((prev) => prev - 1);
  }
};
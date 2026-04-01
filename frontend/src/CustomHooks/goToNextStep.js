
export const goToNextStep = (setCurrentStep, currentStep, steps) => {
  if (currentStep < steps.length - 1) {
    setCurrentStep((prev) => prev + 1);
  }
};
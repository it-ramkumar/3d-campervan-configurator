export const goToNextStep = (setCurrentStep, steps) => {
  setCurrentStep((prev) => {
    if (prev < steps.length - 1) {
      return prev + 1;
    }
    return prev;
  });
};

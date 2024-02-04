import { ReactElement, useState } from 'react';

const useMultiStepForm = (steps: ReactElement[]) => {
  const [currStepIndex, setCurrStepIndex] = useState(0);

  const next = () => {
    setCurrStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const back = () => {
    setCurrStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (index: number) => {
    setCurrStepIndex(index);
  };

  return {
    currStepIndex,
    step: steps[currStepIndex],
    steps,
    isFirstStep: currStepIndex === 0,
    isLastStep: currStepIndex === steps.length - 1,
    goTo,
    next,
    back
  };
};

export default useMultiStepForm;

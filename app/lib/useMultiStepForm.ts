import { ReactElement, useState } from 'react';

const useMultiStepForm = (steps: ReactElement[]) => {
  /*
  Custom hook for managing multi-step forms.

  Props:
  - steps: Array of ReactElement representing individual steps in the form.

  Returns an object with the following properties and functions:
  - currStepIndex: Current step index
  - step: Current step component
  - steps: All steps in the form
  - isFirstStep: Boolean, true if it's the first step
  - isLastStep: Boolean, true if it's the last step
  - goTo: Function to go to a specific step
  - next: Function to move to the next step
  - back: Function to go back to the previous step
*/
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
    back,
  };
};

export default useMultiStepForm;

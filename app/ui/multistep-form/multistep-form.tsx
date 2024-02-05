'use client';
import useMultiStepForm from '@/app/ui/multistep-form/useMultiStepForm';
import ProgressBar from '@/app/ui/multistep-form/progress-bar';

const MultiStepForm = () => {
  const { step, steps, isFirstStep, isLastStep, currStepIndex, back, next } =
    useMultiStepForm([<div key={"one"}>One</div>, <div key={"two"}>Two</div>, <div key={"three"}>Three</div>]);

  return (
    <>
      <ProgressBar currStepIndex={currStepIndex} />
      <form>
        {currStepIndex + 1} / {steps.length}
        {step}
        {!isFirstStep && (
          <button type='button' onClick={back}>
            Back
          </button>
        )}
        <button type='button' onClick={next}>
          {isLastStep ? 'Finish' : 'Next'}
        </button>
      </form>
    </>
  );
};

export default MultiStepForm;

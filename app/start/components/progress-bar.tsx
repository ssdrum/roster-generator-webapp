import { FC } from 'react';

type Props = { currStepIndex: number };

const ProgressBar: FC<Props> = ({ currStepIndex }) => {
  // Calculate the width of the progress bar dynamically based on the current step index
  const progressBarWidth = `${((currStepIndex + 1) / 2) * 100}%`;

  return (
    <div className='mb-10'>
      <h2 className='sr-only'>Steps</h2>
      <div>
        <p className='text-xs font-medium text-gray-500'>
          {currStepIndex + 1}/2
        </p>
        {/* Apply animation to the progress bar using CSS transitions */}
        <div className='mt-4 overflow-hidden rounded-full bg-gray-200'>
          <div
            className='h-2 rounded-full bg-blue-500'
            style={{
              width: progressBarWidth,
              transition: 'width 0.5s ease-in-out',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

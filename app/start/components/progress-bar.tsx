// Component: https://www.hyperui.dev/components/application-ui/steps

import { FC } from 'react';
import ProgressBarItem from '@/app/start/components/progress-bar-item';

type Props = { currStepIndex: number };

const ProgressBar: FC<Props> = ({ currStepIndex }) => {
  return (
    <div className='m-auto my-20 flex max-w-2xl flex-col'>
      <h2 className='sr-only'>Steps</h2>

      <div className='after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200'>
        <ol className='flex justify-between text-sm font-medium text-gray-500'>
          <ProgressBarItem
            title={'Business Details'}
            isChecked={currStepIndex > 0}
            alignment={'start'}
          />
          <ProgressBarItem
            title={'Employees'}
            isChecked={currStepIndex > 1}
            alignment={'center'}
          />
          <ProgressBarItem
            title={'Assignments'}
            isChecked={currStepIndex > 2}
            alignment={'end'}
          />
        </ol>
      </div>
    </div>
  );
};

export default ProgressBar;

// Component: https://www.hyperui.dev/components/application-ui/steps

import { FC } from 'react';
import ProgressBarItem from '@/app/ui/multistep-form/progress-bar-item';

type Props = { currStepIndex: number };

const ProgressBar: FC<Props> = ({ currStepIndex }) => {
  return (
    <div>
      <h2 className='sr-only'>Steps</h2>

      <div className='after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200'>
        <ol className='grid grid-cols-3 text-sm font-medium text-gray-500'>
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

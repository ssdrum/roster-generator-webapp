import { FC } from 'react';

type Props = {
  title: string;
  isChecked: boolean;
  alignment: 'start' | 'center' | 'end';
};

const getDynamicClassName = (
  alignment: Props['alignment'],
  isChecked: boolean
) => {
  const svgAlignments = {
    start: 'start-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'end-0',
  };

  const baseClassName = `absolute -bottom-[1.75rem] ${svgAlignments[alignment]} rounded-full text-white`;
  const colorClassName = isChecked ? 'bg-green-600' : 'bg-gray-600';

  return `${baseClassName} ${colorClassName}` as const;
};

const ProgressBarItem: FC<Props> = ({ title, isChecked, alignment }) => {
  return (
    <li
      className={`relative flex justify-${alignment} ${
        isChecked ? 'text-green-600' : 'text-gray-600'
      }`}
    >
      <span className={getDynamicClassName(alignment, isChecked)}>
        <svg
          className='h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
      </span>

      <span className='hidden sm:block'> {title} </span>

      <svg
        className='h-6 w-6 sm:hidden'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
        />
      </svg>
    </li>
  );
};

export default ProgressBarItem;

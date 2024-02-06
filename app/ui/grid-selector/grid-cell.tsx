import React, { FC } from 'react';

type Props = {
  day: number;
  shiftName: string;
  value: number;
  updateValue: (value: number) => void;
};

const GridCell: FC<Props> = ({ day, shiftName, value, updateValue }) => {
  return (
    <td className='w-20 border p-2'>
      <input
        className='h-10 w-full p-2 text-center'
        type='number'
        value={value}
        onChange={(e) => updateValue(parseInt(e.target.value, 10))}
        min={0}
      />
    </td>
  );
};

export default GridCell;

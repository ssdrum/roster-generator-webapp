import React, { FC } from 'react';

type Props = {
  shiftId: number;
  day: number;
  value: number;
  updateValue: (shiftId: number, day: number, newValue: number) => void;
};

const GridCell: FC<Props> = ({ shiftId, day, value, updateValue }) => {
  return (
    <td className='w-20 border p-2'>
      <input
        className='h-10 w-full p-2 text-center'
        type='number'
        value={value}
        onChange={(e) =>
          updateValue(shiftId, day, parseInt(e.target.value, 10))
        }
        min={0}
      />
    </td>
  );
};

export default GridCell;

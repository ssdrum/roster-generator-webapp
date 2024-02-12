import React, { FC } from 'react';

type Props = {
  day: number;
  name: string;
  value: number;
};

const GridCell: FC<Props> = ({ value }) => { // Update prop name here as well
  return (
    <td className='w-20 border p-2'>
      <input
        className='h-10 w-full p-2 text-center'
        type='number'
        value={value}
        onChange={(e) => console.log(parseInt(e.target.value, 10))} // Use updateValue prop
        min={0}
      />
    </td>
  );
};

export default GridCell;

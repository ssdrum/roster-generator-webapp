import React, { FC, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import GridCell from '@/app/ui/grid-selector/grid-cell';
import { z } from 'zod';
import { formSchema } from '@/app/schemas/formSchemas';

const daysNames = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

type Shift = {
  shiftName: string;
  startTime: string;
  endTime: string;
};

type Props = {
  workDays: number[];
  shifts: Shift[];
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

type GridState = {
  [day: number]: {
    [shiftName: string]: number;
  };
};

const GridSelector: FC<Props> = ({ workDays, shifts }) => {
  const initialGridState: GridState = {};

  // Initialize gridState based on workDays and shifts
  workDays.forEach((day) => {
    initialGridState[day] = {};
    shifts.forEach((shift) => {
      initialGridState[day][shift.shiftName] = 1; // You can set any default number here
    });
  });

  const [gridState, setGridState] = useState<GridState>(initialGridState);

  // Function to update the gridState with a new value
  const updateGridState = (day: number, shiftName: string, value: number) => {
    setGridState((prevGridState) => ({
      ...prevGridState,
      [day]: {
        ...prevGridState[day],
        [shiftName]: value,
      },
    }));

    console.log(gridState);
  };

  console.log(shifts)

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='font-size-lg'>
        Select the number of employees to be assigned per shift
      </h1>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='w-16  p-2'></th>
            {workDays.map((day) => (
              <th key={day} className='w-20 p-2 text-center'>
                {daysNames[day]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.shiftName}>
              <td className='w-16  p-2'>{shift.shiftName}</td>
              {workDays.map((day) => (
                <GridCell
                  key={`${shift.shiftName}-${day}`}
                  day={day}
                  name={shift.shiftName}
                  value={gridState[day][shift.shiftName]}
                  updateValue={(value) =>
                    updateGridState(day, shift.shiftName, value)
                  }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridSelector;

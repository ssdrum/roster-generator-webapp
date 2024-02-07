import React, { FC, useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import GridCell from '@/app/start/components/grid-cell';
import { z } from 'zod';
import { ShiftType, formSchema } from '@/app/lib/formSchemas';

// Days displayed in the header of the table
const daysNames = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

type Props = {
  workDays: number[];
  shifts: ShiftType[];
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

type GridState = {
  [day: number]: {
    [shiftName: string]: number;
  };
};

const GridSelector: FC<Props> = ({ workDays, shifts, form }) => {
  // Initialize gridState based on workDays and shifts
  const initialGridState: GridState = {};

  workDays.forEach((day) => {
    initialGridState[day] = {};
    shifts.forEach((shift) => {
      initialGridState[day][shift.shiftName] = 1; // Sets default values in component's state,
      form.setValue(`numEmployeesAssigned.${day}.${shift.shiftName}`, 1); // Sets default values in form
    });
  });

  const [gridState, setGridState] = useState<GridState>(initialGridState);

  // This component manages its own state internally. The function form.setValue()
  // keeps the component's state in sync with the main form
  const updateGridState = (day: number, shiftName: string, value: number) => {
    setGridState((prevGridState) => ({
      ...prevGridState,
      [day]: {
        ...prevGridState[day],
        [shiftName]: value,
      },
    }));

    // Update form
    form.setValue(`numEmployeesAssigned.${day}.${shiftName}`, value);
  };

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

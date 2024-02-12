import React, { FC, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import GridCell from '@/app/start/components/grid-cell';
import { z } from 'zod';
import {
  ShiftType,
  WeeklyAssignmentsType,
  formSchema,
} from '@/app/lib/formSchemas';

// Days displayed in the table header
const daysNames = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

type Props = {
  workDays: number[];
  shifts: ShiftType[];
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

// Example assignments example:
//numEmployeesAssigned: [
//  {
//    shiftId: -2,
//    shiftName: 'Morning',
//    assignments: [
//      { day: 0, numAssigned: 2 },
//      { day: 1, numAssigned: 1 },
//    ],
//  },
//  {
//    shiftId: -1,
//    shiftName: 'Evening',
//    assignments: [
//      { day: 0, numAssigned: 3 },
//      { day: 1, numAssigned: 2 },
//    ],
//  },
//],
const GridSelector: FC<Props> = ({ workDays, shifts, form }) => {
  const getValue = (shiftId: number, day: number) => {
    const formValues = form.getValues();
    // Find the shift with the corresponding shiftId
    const shift = formValues.numEmployeesAssigned.find(
      (s) => s.shiftId === shiftId
    )!;
    const assignment = shift.assignments.find((a) => a.day === day)!;
    return assignment.numAssigned;
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
            <tr key={shift.shiftId}>
              <td className='w-16  p-2'>{shift.shiftName}</td>
              {workDays.map((day) => (
                <GridCell
                  key={`${shift.shiftId}-${day}`}
                  day={day}
                  name={shift.shiftName}
                  value={getValue(shift.shiftId, day)}
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

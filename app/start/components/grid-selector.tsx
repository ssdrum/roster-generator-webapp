import React, { FC } from 'react';
import { UseFormReturn, FieldPath } from 'react-hook-form';
import GridCell from '@/app/start/components/grid-cell';
import { z } from 'zod';
import { ShiftType, formSchema } from '@/app/lib/formSchemas';

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
  // Get value for each cell from form data
  const getValue = (shiftId: number, day: number): number => {
    const formValues = form.getValues();
    // Find the shift with the corresponding shiftId
    const shift = formValues.numEmployeesAssigned.find(
      (s) => s.shiftId === shiftId
    );
    if (shift === undefined) {
      return 1;
    }
    const assignment = shift.assignments.find((a) => a.day === day);
    if (assignment === undefined) {
      return 1;
    }
    return assignment.numAssigned;
  };

  // Updates form value on change
  const updateValue = (
    shiftId: number,
    day: number,
    newValue: number
  ): void => {
    // Locate the shift object by shiftId in the form data
    const shiftIndex = form
      .watch('numEmployeesAssigned')
      .findIndex((s) => s.shiftId === shiftId);
    // Locate the assignment object by day in the shift's assignments
    const assignmentIndex = form
      .watch(`numEmployeesAssigned.${shiftIndex}.assignments`)
      .findIndex((a) => a.day === day);

    // FieldPath recursively generates all combinations of possible paths. Without it, we would have to do it manually.
    // However, I am not entirely sure that I am using it correctly. For now it seems to work. Keep an eye on it
    // In case of unexpected bahaviour
    const fieldPath: FieldPath<z.infer<typeof formSchema>> =
      `numEmployeesAssigned.${shiftIndex}.assignments.${assignmentIndex}.numAssigned`;

    form.setValue(fieldPath, newValue);
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
                  shiftId={shift.shiftId}
                  day={day}
                  value={getValue(shift.shiftId, day)}
                  updateValue={updateValue}
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

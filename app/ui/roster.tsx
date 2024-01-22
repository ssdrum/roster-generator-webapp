'use client';
import { Roster } from '@/app/lib/types';
import React, { FC } from 'react'; // Import FC (functional component)

// Specify props type
type Props = {
  rosterData: Roster;
};

// Create component
const RosterVisualizer: FC<Props> = ({ rosterData }) => {
  if (rosterData) {
    if (rosterData.status == 0) {
      return <h1>Constraints are unfeasible</h1>;
    }
    const { week_length, data } = rosterData;

    const days_array = Array.from(
      { length: week_length },
      (_, index) => index + 1
    );

    const table_rows = data.map((employee) => (
      <tr key={employee.employee_name}>
        <td className='border px-4 py-2'>{employee.employee_name}</td>
        {employee.shifts.map((shift, i) =>
          shift === 1 ? (
            <td key={i} className='border bg-red-300 px-4 py-2 text-center'>
              Off
            </td>
          ) : (
            <td key={i} className='border bg-green-300 px-4 py-2 text-center'>
              {shift - 1}
            </td>
          )
        )}
      </tr>
    ));

    return (
      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse border border-gray-300 bg-white'>
          <thead>
            <tr>
              <th>Employee</th>
              {days_array.map((day) => (
                <th key={day} className='border px-4 py-2'>
                  Day {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{table_rows}</tbody>
        </table>
      </div>
    );
  } else {
    return <p className='text-center'>Nothing to see yet!</p>;
  }
};

export default RosterVisualizer;

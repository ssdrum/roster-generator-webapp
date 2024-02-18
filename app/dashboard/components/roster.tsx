import { FC } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/app/ui/shadcn/table';
import RosterShift from './roster-shift';
import { Employee, Shift } from '@prisma/client';

type RosterAssignment = {
  employee: Employee;
  shiftsAssigned: (Shift | null)[];
};

type Props = {
  assignments: RosterAssignment[];
  shifts: Shift[]
};

const Roster: FC<Props> = ({ assignments, shifts }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  console.log(assignments)

  // the function for choosing which side the shift should extend to
  function determineSide(shifts: (Shift | null)[], index: number): string {
    // check if first one
    if (index === 0) {
      return shifts[index + 1] !== null ? 'left' : 'single';
    }

    // check if last one
    if (index === shifts.length - 1) {
      return shifts[index - 1] !== null ? 'right' : 'single';
    }

    // somewhere in the middle
    if (shifts[index - 1] !== null && shifts[index + 1] !== null) {
      return 'both';
    } else if (shifts[index - 1] !== null) {
      return 'right';
    } else if (shifts[index + 1] !== null) {
      return 'left';
    } else {
      return 'single';
    }
  }

  return (
    <div className='w-full rounded-lg border'>
      <div className='relative w-full overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[120px] border-r' />
              {days.map((day) => (
                <TableHead key={day} className='border-r'>
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* loop over the assignments array and get the employees and their shifts */}
            {assignments.map(({ employee, shiftsAssigned }) => (
              <TableRow key={employee.name}>
                <TableCell className='w-64 font-medium'>{employee.name}</TableCell>
                {/* loop over the days and draw shifts in the cells where there are shifts */}
                {days.map((d, index) => (
                  <TableCell key={index} className='border-l p-0'>
                    {shiftsAssigned !== null && shiftsAssigned[index] !== null ? (
                      // pass the props to the shift component
                      <RosterShift
                        side={
                          determineSide(shiftsAssigned, index) as
                            | 'left'
                            | 'right'
                            | 'single'
                            | 'both'
                        } // calculate if it should stretch to a side, and assert into the allowed options
                        name={shiftsAssigned[index]?.name}
                        startTime={shiftsAssigned[index]?.startTime}
                        endTime={shiftsAssigned[index]?.endTime}
                        employee={employee.name}
                        shifts={shifts}
                      />
                    ) : (
                      ''
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Roster;

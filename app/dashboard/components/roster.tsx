import { FC, useContext } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/app/ui/shadcn/table';
import RosterShift from './roster-shift';
import { Shift, User } from '@prisma/client';
import { RosterAssignment } from '@/app/lib/formSchemas';
import AddShift from './add-shift';

type Props = {
  assignments: RosterAssignment[];
  shifts: Shift[];
  userData: User;
};

const daysNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const Roster: FC<Props> = ({ assignments, shifts, userData }) => {
  // Select only days selected by the user
  const days: string[] = [];
  userData.workDays.forEach((workDay) => days.push(daysNames[workDay]));

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
    <div className='mb-10 w-full rounded-lg border'>
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
            {assignments.map((assignment, i) => (
              <TableRow key={assignment.employee.name}>
                <TableCell className='w-64 font-medium'>
                  {assignment.employee.name}
                </TableCell>
                {/* loop over the days and draw shifts in the cells where there are shifts */}
                {days.map((d, index) => (
                  <TableCell key={index} className='border-l p-0'>
                    {assignment.shiftsAssigned !== null &&
                    assignment.shiftsAssigned[index] !== null ? (
                      // pass the props to the shift component
                      <RosterShift
                        side={
                          determineSide(assignment.shiftsAssigned, index) as
                            | 'left'
                            | 'right'
                            | 'single'
                            | 'both'
                        } // calculate if it should stretch to a side, and assert into the allowed options
                        id={assignment.shiftsAssigned[index]?.id}
                        name={assignment.shiftsAssigned[index]?.name}
                        startTime={assignment.shiftsAssigned[index]?.startTime}
                        endTime={assignment.shiftsAssigned[index]?.endTime}
                        employee={assignment.employee.name}
                        shifts={shifts}
                        assignment={assignment}
                        day={index}
                      />
                    ) : (
                      <AddShift
                        shifts={shifts}
                        assignment={assignment}
                        day={index}
                      />
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

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/app/ui/shadcn/table';
import Shift from './shift';

interface Shift {
  name: string;
  startTime: string;
  endTime: string;
}

interface Assignment {
  employee: string;
  shifts: (Shift | null)[];
}

interface Props {
  assignments: Assignment[];
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const Roster: React.FC<Props> = ({ assignments, setShowEditDialog }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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
            {assignments.map(({ employee, shifts }) => (
              <TableRow key={employee}>
                <TableCell className='w-64 font-medium'>{employee}</TableCell>
                {/* loop over the days and draw shifts in the cells where there are shifts */}
                {days.map((d, index) => (
                  <TableCell key={index} className='border-l p-0'>
                    {shifts !== null && shifts[index] !== null ? (
                      // pass the props to the shift component
                      <Shift
                        side={
                          determineSide(shifts, index) as
                            | 'left'
                            | 'right'
                            | 'single'
                            | 'both'
                        } // calculate if it should stretch to a side, and assert into the allowed options
                        name={shifts[index]?.name}
                        startTime={shifts[index]?.startTime}
                        endTime={shifts[index]?.endTime}
                        employee={employee}
                        setShowEditDialog={setShowEditDialog}
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

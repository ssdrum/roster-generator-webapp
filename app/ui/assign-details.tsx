import React, { FC } from 'react';

// shadcn
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Day } from '../schemas/formSchemas';

type Props = {
  incrementEmployeesAssigned: (dayIndex: number) => void;
  decrementEmployeesAssigned: (dayIndex: number) => void;
  days: Day[];
  employeesAssigned: number[];
};

const AssignDetails: FC<Props> = ({
  days,
  incrementEmployeesAssigned,
  decrementEmployeesAssigned,
  employeesAssigned,
}) => {
  return (
    <>
      {/* assign a number for every employee for each day in days */}
      {/* TODO: use the number of days selected instead of the days of the week (maybe remove days from the days array if they're not selected?) */}
      <div className='grid grid-cols-7 gap-4'>
        {days.map((day, index) => (
          <Card key={day}>
            <CardHeader>{day}</CardHeader>
            <CardContent>
              <div className='flex items-center justify-between'>
                <button
                  type='button'
                  onClick={() => decrementEmployeesAssigned(index)}
                >
                  -
                </button>
                <Input
                  type='text'
                  readOnly //it's only an input so it submits with the form, but no manual changing
                  // TODO: remove weird border shadows on focus
                  className='flex items-center justify-center border-none text-center focus:shadow-none focus:outline-none focus:ring-offset-0 focus-visible:ring-0'
                  value={employeesAssigned[index]}
                />
                <button
                  type='button'
                  onClick={() => incrementEmployeesAssigned(index)}
                >
                  +
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
export default AssignDetails;

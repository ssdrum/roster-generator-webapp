'use client';

import { FC, useState } from 'react';
import Roster from './components/roster';
import { Employee, NumEmployeesAssigned, Shift } from '@prisma/client';
import ButtonLoading from './components/button-loading';
import { Button } from '../ui/shadcn/button';

type Props = {
  employees: Employee[];
  shifts: Shift[];
  numEmployeesAssigned: NumEmployeesAssigned[];
};

const Dashboard: FC<Props> = ({ employees, shifts, numEmployeesAssigned }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = async () => {
    setIsGenerating(true);
    console.log('clicked');
    setIsGenerating(false);
  };

  // temporary assignments data
  const assignments = [
    {
      employee: 'John',
      shifts: [
        { name: 'Blah', startTime: '8:00 AM', endTime: '4:00 PM' },
        null,
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        null,
        { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' },
      ],
    },
    {
      employee: 'Jane',
      shifts: [
        null,
        { name: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM' },
        null,
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' },
      ],
    },
  ];

  return (
    <>
      <Roster assignments={assignments} />
      {isGenerating ? (
        <ButtonLoading />
      ) : (
        <Button onClick={handleClick}>Generate Roster</Button>
      )}
    </>
  );
};

export default Dashboard;

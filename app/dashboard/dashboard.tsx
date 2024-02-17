import { FC } from 'react';
import Roster from './components/roster';
import { Employee, NumEmployeesAssigned, Shift } from '@prisma/client';

type Props = {
  employees: Employee[];
  shifts: Shift[];
  numEmployeesAssigned: NumEmployeesAssigned[];
};

const Dashboard: FC<Props> = ({ employees, shifts, numEmployeesAssigned }) => {
  console.log(employees);
  console.log(shifts);
  console.log(numEmployeesAssigned);

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
    {
      employee: 'Bob',
      shifts: [
        { name: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM' },
        null,
        null,
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        null,
      ],
    },
    {
      employee: 'Alice',
      shifts: [
        null,
        null,
        { name: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM' },
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' },
      ],
    },
  ];

  return <Roster assignments={assignments} />;
};

export default Dashboard;

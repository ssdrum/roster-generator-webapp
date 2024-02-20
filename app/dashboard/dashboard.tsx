'use client';

import { FC, useEffect, useState } from 'react';
import Roster from './components/roster';
import { Employee, NumEmployeesAssigned, Shift, User } from '@prisma/client';
import ButtonLoading from './components/button-loading';
import { Button } from '../ui/shadcn/button';
import genRoster from '../lib/roster-api-interface';
import Title from '@/app/ui/title';
import EditShiftBtn from './components/edit-shift-dialog';
import { RosterAssignment } from '../lib/formSchemas';

type Props = {
  user: User;
  employees: Employee[];
  shifts: Shift[];
  numEmployeesAssigned: NumEmployeesAssigned[];
};

const Dashboard: FC<Props> = ({
  user,
  employees,
  shifts,
  numEmployeesAssigned,
}) => {
  const [rosterData, setRosterData] = useState<RosterAssignment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // generate a roster and save it to the database
  const handleClick = async () => {
    setIsGenerating(true);
    const roster = await genRoster(user, employees, shifts);
    try {
      const response = await fetch('api/prisma/roster', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(roster),
      });
    } catch (error) {
      console.error('Error saving roster:', error);
    } finally {
      fetchData();
      setIsGenerating(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('api/prisma/roster');
      const data = await response.json();
      setRosterData(data.rosterAssignments);
    } catch (error) {
      console.error('Error fetching roster:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  return (
    <>
      <Title title={'Dashboard'} />
      {isLoaded && <Roster assignments={rosterData} shifts={shifts} />}
      {isGenerating ? (
        <ButtonLoading />
      ) : (
        <Button onClick={handleClick}>Generate Roster</Button>
      )}
    </>
  );
};

export default Dashboard;

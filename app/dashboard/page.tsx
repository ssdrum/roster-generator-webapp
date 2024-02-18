'use client';

import { useContext, useState } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import Roster from './components/roster';
import ButtonLoading from './components/button-loading';
import { Button } from '../ui/shadcn/button';
import genRoster from '../lib/roster-api-interface';
import Title from '@/app/ui/title';

const Dashboard = () => {
  const { user, employees, shifts } = useContext(DashboardContext)!;

  const [isGenerating, setIsGenerating] = useState(false);
  const [rosterData, setRosterData] = useState(null);

  const handleClick = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait one second
    const roster = await genRoster(user, employees, shifts);
    setRosterData(roster);
    setIsGenerating(false);
  };

  //// assignments data structure
  //const assignments = [
  //  {
  //    employee: 'John',
  //    shifts: [
  //      { name: 'Blah', startTime: '8:00 AM', endTime: '4:00 PM' },
  //      null,
  //      { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
  //      null,
  //      { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' },
  //    ],
  //  },
  //  {
  //    employee: 'Jane',
  //    shifts: [
  //      null,
  //      { name: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM' },
  //      null,
  //      { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
  //      { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' },
  //    ],
  //  },
  //];

  return (
    <>
      <Title title={'Dashboard'} />
      {rosterData && <Roster assignments={rosterData} shifts={shifts} />}
      {isGenerating ? (
        <ButtonLoading />
      ) : (
        <Button onClick={handleClick}>Generate Roster</Button>
      )}
    </>
  );
};

export default Dashboard;

'use client';

import { useContext, useState } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import Roster from './components/roster';
import ButtonLoading from './components/button-loading';
import { Button } from '../ui/shadcn/button';
import genRoster from '../lib/roster-api-interface';
import Title from '@/app/ui/title';
import { useRouter } from 'next/navigation';

type APIresponseType = {
  status: number;
  numSolutions: number;
  data: [];
};
const Dashboard = () => {
  const { userData, employees, shifts, assignments } =
    useContext(DashboardContext)!;
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter()

  const handleClick = async () => {
    setIsGenerating(true);
    const roster = await genRoster(userData, employees, shifts);
    try {
      // Store roster to database
      const response = await fetch('api/prisma/roster', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(roster.data),
      });
    } catch (error) {
      console.error('Error saving roster:', error);
    } finally {
      router.refresh() // Refresh to re-fetch data
      setIsGenerating(false);
    }

    //if (APIresponse.status === 1) {
    //  // Status 1 means that the constraints are unfeasible
    //  alert(
    //    'Looks like there was an error! Try changing your settings before re-generating'
    //  );
    //  setRosterData(null);
    //} else {
    //  setRosterData(APIresponse);
    //}
  };

  return (
    <>
      <Title title={'Dashboard'} />
      {assignments.length > 0 && ( // Only show roster if there are assignments stored
        <Roster assignments={assignments} shifts={shifts} userData={userData} />
      )}
      {/*
      {rosterData && (
        <p className='mb-5'>
          Showing 1 of {rosterData.numSolutions} possible rosters.
        </p>
      )}
      */}
      {isGenerating ? (
        <ButtonLoading />
      ) : (
        <Button onClick={handleClick} className=''>
          {assignments.length > 0 ? 'Regenerate' : 'Generate Roster'}
        </Button>
      )}
      {/*
       */}
    </>
  );
};

export default Dashboard;

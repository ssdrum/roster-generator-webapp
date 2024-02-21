'use client';

import { useContext, useState } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import Roster from './components/roster';
import ButtonLoading from './components/button-loading';
import { Button } from '../ui/shadcn/button';
import genRoster from '../lib/roster-api-interface';
import Title from '@/app/ui/title';
import { useRouter } from 'next/navigation';
import { storeRoster } from '../lib/data';

// The roster-generating API returns data in this format
type APIresponseType = {
  status: number; // 0 for success, 1 for infeasible
  numSolutions: number;
  data: [];
};

const Dashboard = () => {
  const { userData, employees, shifts, assignments } =
    useContext(DashboardContext)!;
  const [isGenerating, setIsGenerating] = useState(false);
  const [numSolutions, setNumSolutions] = useState<number | null>(null);

  const router = useRouter();

  // Try generating roster and display result
  const handleClick = async () => {
    setIsGenerating(true);
    let APIresponse: APIresponseType = await genRoster(
      userData,
      employees,
      shifts,
      false // First try by setting numDaysOff as a hard constraint
    );
    let { status, numSolutions, data } = APIresponse;

    if (status === 1) {
      // If the roster is infeasible, try setting numDaysOff as a soft constraint
      APIresponse = await genRoster(userData, employees, shifts, true);
      ({ status, numSolutions, data } = APIresponse); // Override first response

      // If the constraints are infeasible again, tell user to change constraints
      if (status === 1) {
        setIsGenerating(false);
        setNumSolutions(null);
        alert(
          "Looks like we can't make your roster! Try changing the parameters before re-generating"
        );
        return;
      } else {
        // Otherwise, notify the user that we have relaxed number of days off
        alert(
          `We couldn't assign ${userData.numDaysOff} days off to everyone. This is the best result possible.`
        );
      }
    }

    // Store roster to database
    try {
      const response = await fetch('api/prisma/roster', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error saving roster:', error);
    } finally {
      router.refresh(); // Reload page to see changes
      setNumSolutions(numSolutions);
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Title title={'Dashboard'} />
      {assignments.length > 0 && ( // Only show roster if there are assignments stored
        <Roster assignments={assignments} shifts={shifts} userData={userData} />
      )}
      {numSolutions && (
        <p className='mb-5'>Showing 1 of {numSolutions} possible rosters.</p>
      )}
      {isGenerating ? (
        <ButtonLoading />
      ) : (
        <Button onClick={handleClick} className=''>
          {assignments.length > 0 ? 'Regenerate' : 'Generate Roster'}
        </Button>
      )}
    </>
  );
};

export default Dashboard;

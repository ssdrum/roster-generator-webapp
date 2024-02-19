'use client';

import { useContext, useState } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import Roster from './components/roster';
import ButtonLoading from './components/button-loading';
import { Button } from '../ui/shadcn/button';
import genRoster from '../lib/roster-api-interface';
import Title from '@/app/ui/title';

type APIresponseType = {
  status: number;
  numSolutions: number;
  data: [];
};
const Dashboard = () => {
  const { user, employees, shifts } = useContext(DashboardContext)!;

  const [isGenerating, setIsGenerating] = useState(false);
  const [rosterData, setRosterData] = useState<APIresponseType | null>(null);

  const handleClick = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait one second
    const APIresponse: APIresponseType = await genRoster(
      user,
      employees,
      shifts
    );
    setIsGenerating(false);

    if (APIresponse.status === 1) {
      // Status 1 means that the constraints are unfeasible
      alert(
        'Looks like there was an error! Try changing your settings before re-generating'
      );
      setRosterData(null);
    } else {
      setRosterData(APIresponse);
    }
  };

  return (
    <>
      <Title title={'Dashboard'} />
      {rosterData && <Roster assignments={rosterData.data} shifts={shifts} />}
      {rosterData && (
        <p className='mb-5'>
          Showing 1 of {rosterData.numSolutions} possible rosters.
        </p>
      )}
      {isGenerating ? (
        <ButtonLoading />
      ) : (
        <Button onClick={handleClick} className=''>
          {rosterData ? 'Regenerate' : 'Generate Roster'}
        </Button>
      )}
    </>
  );
};

export default Dashboard;

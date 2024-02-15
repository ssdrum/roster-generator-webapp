'use client';

import { useState } from 'react';
import ButtonLoading from './components/loading-button';
import { Button } from '@/app/ui/shadcn/button';
import genRoster from '@/app/lib/api-interface';
import Roster from './components/roster';

const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [rosterData, setRosterData] = useState(null);

  // temporary assignments data
  const assignments = [
    {
      employee: 'employeeID',
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

  const handleClick = async () => {
    // setIsGenerating((currState) => !currState);
    // Query data from db
    // Translate for API
    // Send to API
    // Get data back
    // Show roster
    // Store to db
    setRosterData(await genRoster());
  };

  //if (hasRoster) return <Roster assignments={assignments} />;
  //else
  if (rosterData) {
    return <Roster assignments={rosterData} />;
  } else {
    return isGenerating ? (
      <ButtonLoading handleClick={handleClick} />
    ) : (
      <Button onClick={handleClick}>Generate Roster</Button>
    );
  }
};

export default Dashboard;

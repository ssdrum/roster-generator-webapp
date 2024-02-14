'use client';

import { useState } from 'react';
import ButtonLoading from './components/loading-button';
import { Button } from '@/app/ui/shadcn/button';
import Roster from './components/roster';

const hasRoster = false;

const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);

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

  const submitToDB = async (data: any) => {
    // Send the POST request using fetch
    try {
    const res = await fetch('/roster-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData = async () => {
    try {
      // Send the GET request using fetch
      const res = await fetch('/api/fetch-test', {
        method: 'GET',
      });

      if (res.ok) {
        // Assuming the API responds with a JSON object containing a 'redirect' property
        const jsonResponse = await res.json();
        console.log(jsonResponse);
      } else {
        console.error('Error:', res.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = () => {
    setIsGenerating((currState) => !currState);
    fetchData();
  };

  if (hasRoster) return <Roster assignments={assignments} />;
  else
    return isGenerating ? (
      <ButtonLoading handleClick={handleClick} />
    ) : (
      <Button onClick={handleClick}>Generate Roster</Button>
    );
};

export default Dashboard;

'use client';

import Roster from "./components/roster";

const Page = () => {
  
  // temporary assignments data
  const assignments = [
    {
      employee: 'John',
      shifts: [
        { name: 'Blah', startTime: '8:00 AM', endTime: '4:00 PM' },
        null,
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        null,
        { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' }
      ]
    },
    {
      employee: 'Jane',
      shifts: [
        null,
        { name: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM' },
        null,
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' }
      ]
    },
    {
      employee: 'Bob',
      shifts: [
        { name: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM' },
        null,
        null,
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        null
      ]
    },
    {
      employee: 'Alice',
      shifts: [
        null,
        null,
        { name: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM' },
        { name: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM' },
        { name: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM' }
      ]
    }
  ];  
  
  return <Roster assignments={assignments} />;
};

export default Page;

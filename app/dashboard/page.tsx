'use client';
import React, { useState } from 'react';
import Form from '@/app/ui/form';
import RosterVisualizer from '@/app/ui/roster';
import { Roster } from '@/app/lib/types';

// Page Component
const Page = () => {
  const [rosterData, setRosterData] = useState<Roster | null>(null);

  const handleRosterData = (data: Roster) => {
    setRosterData(data);
  };

  return (
    <>
      <Form handleRosterData={handleRosterData} />
      <RosterVisualizer data={rosterData} />
    </>
  );
};

export default Page;

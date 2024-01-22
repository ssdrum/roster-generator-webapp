'use client';
import { Roster } from '@/app/lib/types';
import React, { useState } from 'react';
import Form from '@/app/ui/form';
import RosterVisualizer from '@/app/ui/roster';
import Spinner from '@/app/ui/spinner';

// Page Component
const Page = () => {
  const [rosterData, setRosterData] = useState<Roster | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRosterData = (data: Roster) => {
    setRosterData(data);
  };

  return (
    <>
      <Form handleRosterData={handleRosterData} setIsLoading={setIsLoading} />
      {isLoading ? <Spinner /> : <RosterVisualizer rosterData={rosterData} />}
    </>
  );
};

export default Page;

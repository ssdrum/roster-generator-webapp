'use client';
import React, { useState } from 'react';
import Form from '@/app/ui/form';
import Roster from '@/app/ui/roster';
import { RosterData } from '@/app/lib/types';

// Page Component
const Page = () => {
  const [rosterData, setRosterData] = useState<RosterData | null>(null);

  const handleRosterData = (rosterData: RosterData) => {
    setRosterData(rosterData);
  };

  return (
    <>
      <Form handleRosterData={handleRosterData} />
      <Roster rosterData={rosterData} />
    </>
  );
};

export default Page;

'use client';
import React, { useState } from 'react';
import Form from '@/app/ui/form';
import Roster from '@/app/ui/roster';

// Interfaces
interface ShiftData {
  [name: string]: number[];
}

interface RosterData {
  num_days: number;
  shifts: ShiftData;
}

// Page Component
const Page = () => {
  const [rosterData, setRosterData] = useState<RosterData | null>(null);

  const handleRosterData = (formData: RosterData) => {
    setRosterData(formData);
  };

  return (
    <>
      <Form handleRosterData={handleRosterData} />
      <Roster rosterData={rosterData} />
    </>
  );
};

export default Page;

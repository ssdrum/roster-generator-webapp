'use client';
import React, { useState } from 'react';
import { Roster } from '@/app/lib/types';
import Form from '@/app/ui/form';
import RosterVisualizer from '@/app/ui/roster';
import SaveButton from './save-button';
import Spinner from '@/app/ui/spinner';

// Page Component
const Page = () => {
  const [rosterData, setRosterData] = useState<Roster | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSave, setShowSave] = useState(false);

  const handleRosterData = (data: Roster) => {
    setRosterData(data);
  };

  // Stores roster data to database
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Form
        handleRosterData={handleRosterData}
        setIsLoading={setIsLoading}
        setShowSave={setShowSave}
      />
      {showSave ? <SaveButton handleSave={handleSave} /> : null}
      {isLoading ? <Spinner /> : <RosterVisualizer rosterData={rosterData} />}
    </>
  );
};

export default Page;

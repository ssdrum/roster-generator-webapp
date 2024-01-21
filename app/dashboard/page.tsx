'use client';
import React, { useState } from 'react';
import Form from '@/app/ui/form';
import Roster from '@/app/ui/roster';

const Page = () => {
  const [rosterData, setRosterData] = useState(null);

  const handleRosterData = (formData) => {
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

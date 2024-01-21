'use client'
import React, { useState } from 'react';
import Form from '@/app/ui/form';
import Roster from '@/app/ui/roster';

const Page = () => {
  const [formData, setRosterData] = useState(null)

  const handleFormSubmit = (formData) => {
    setRosterData(formData);
  };

  return (
    <>
      <Form handleFormSubmit={handleFormSubmit} />
      <Roster rosterData={formData} />
    </>
  );
};
export default Page;

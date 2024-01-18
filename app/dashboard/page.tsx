'use client';

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [apiData, setApiData] = useState('');

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = '/my_api';

    // Make a GET request using fetch
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        setApiData(data.message);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Fetching from API...</h2>
      {apiData && <p>{apiData}</p>}
    </div>
  );
};
export default Page;

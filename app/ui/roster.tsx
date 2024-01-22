import { Roster } from '@/app/lib/types';
import React, { FC } from 'react'; // Import FC (functional component)

// Specify props type
type Props = {
  data: Roster;
};

// Create component
const RosterVisualizer: FC<Props> = ({ data }) => {
  return (
    <>
      <h1>{data ? <p>{data.week_length}</p> : null}</h1>
    </>
  );
};

export default RosterVisualizer;

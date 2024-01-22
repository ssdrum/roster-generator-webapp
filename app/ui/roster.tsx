import { RosterData } from '@/app/lib/types';

interface RosterProps {
  rosterData: RosterData;
}

export default function Roster({ rosterData }: RosterProps) {
console.log(rosterData)
  return (
    <>
      <h1>{rosterData && <p>{rosterData.week_length}</p>}</h1>
    </>
  );
}

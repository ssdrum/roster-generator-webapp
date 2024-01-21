export default function Roster({ rosterData }) {
  return (
    <>
      <h1>{rosterData && <p>{rosterData.num_days}</p>}</h1>
    </>
  );
}

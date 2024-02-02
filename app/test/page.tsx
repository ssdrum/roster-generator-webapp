import { getUserSession } from '@/app/lib/session';
import { fetchEmployees, fetchShifts, fetchAssignments } from '../lib/data';

// I am using this page to test the fetch calls to the database
export default async function Page() {
  const user = await getUserSession();
  const userId = 'cls4v29t5000090hxa1ztottv'; // Change this userId with one that is generated after seeding database to test locally
  const employees = await fetchEmployees(userId);
  const shifts = await fetchShifts(userId);
  const assignments = await fetchAssignments(userId);

  console.log(assignments);

  return <h1>Hello</h1>;
}

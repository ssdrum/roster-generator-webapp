import Navbar from '@/app/ui/navbar';
import { Session } from '@/app/lib/types';
import {
  fetchEmployees,
  fetchNumEmployeesAssigned,
  fetchShifts,
  fetchUserData,
} from '../lib/data';
import { getUserSession } from '@/app/lib/session';
import DashboardProvider from '@/app/dashboard/dashboard-context';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session: Session = await getUserSession();
  const userId = session.id;
  // Fetch all data related to user server-side
  const userData = await fetchUserData(userId);
  const employees = await fetchEmployees(userId);
  const shifts = await fetchShifts(userId);
  const numEmployeesAssigned = await fetchNumEmployeesAssigned(userId);

  return (
    <div className='flex'>
      <Navbar session={session} />

      <div className='container mx-auto my-5'>
        <DashboardProvider
          user={userData}
          employees={employees}
          shifts={shifts}
          numEmployeesAssigned={numEmployeesAssigned}
        >
          {children}
        </DashboardProvider>
      </div>
    </div>
  );
}

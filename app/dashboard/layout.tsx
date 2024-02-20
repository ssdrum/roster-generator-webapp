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
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session: Session = await getUserSession();
  if (session === undefined) {
    redirect('/');
  } else {
    // Fetch all data related to user server-side
    const userId = session.id;
    const userData = await fetchUserData(userId);
    const employees = await fetchEmployees(userId);
    const shifts = await fetchShifts(userId);
    const numEmployeesAssigned = await fetchNumEmployeesAssigned(userId);

    return (
      <div className='flex'>
        <Navbar session={session} />
        <div className='container mx-auto my-5'>
          {/* Context provider provides access to variables below to all components in /dashboard */}
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
}
import Navbar from '@/app/ui/navbar';
import { Session } from '@/app/lib/types';
import {
  fetchAssignments,
  fetchEmployees,
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
    const assignments = await fetchAssignments(userId);

    // Redirect to start form if user is new
    if (userData.isNewUser) {
      redirect('/start');
    }

    return (
      <div className='flex'>
        <Navbar session={session} />
        <div className='container mx-auto my-5'>
          {/* Context provider provides access to variables below to all components in /dashboard */}
          <DashboardProvider
            userData={userData}
            employees={employees}
            shifts={shifts}
            assignments={assignments}
          >
            {children}
          </DashboardProvider>
        </div>
      </div>
    );
  }
}

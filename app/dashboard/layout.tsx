import Navbar from '@/app/ui/navbar';
import { getUserSession } from '../lib/session';
import { Session } from '@/app/lib/types';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session: Session = await getUserSession();

  return (
    <div className='flex'>
      <Navbar session={session} />
      <div className='container mx-auto my-5'>{children}</div>
    </div>
  );
}

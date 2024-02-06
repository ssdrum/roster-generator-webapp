import Navbar from '@/app/ui/navbar';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <Navbar />
      <div className='container mx-auto my-5'>{children}</div>
    </div>
  );
}

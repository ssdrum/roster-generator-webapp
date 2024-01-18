import { getUserSession } from '@/app/lib/session';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Home() {
  const user = await getUserSession();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center space-y-8 p-24'>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Login Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p> Name: {user.name} </p>
          <p> Email: {user.email} </p>
          <p> Image URL: {user.image} </p>
          <p> ID: {user.id} </p>
        </CardContent>
      </Card>

      <span className='space-x-8'>
        <Link href='/dashboard' className={buttonVariants()}>
          Dashboard
        </Link>
        <Link href='/users' className={buttonVariants()}>
          Users
        </Link>
      </span>
    </div>
  );
}

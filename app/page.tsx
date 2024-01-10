import { getUserSession } from '@/app/lib/session';
import Link from 'next/link';

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const user = await getUserSession();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Login Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p> Name: { user.name } </p>
          <p> Email: { user.email } </p>
          <p> Image URL: { user.image } </p>
          <p> ID: { user.id } </p>
        </CardContent>
      </Card>

      <span className="space-x-8">
        <Link href="/dashboard" className={buttonVariants()}>Dashboard</Link>
        <Link href="/users" className={buttonVariants()}>Users</Link>
      </span>

    </div>
  )
}

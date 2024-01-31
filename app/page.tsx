import { getUserSession } from '@/app/lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button'

export default async function Home() {
  const user = await getUserSession();

  console.log(user)
  // redirect if logged in
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <img
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover blur-lg"
          height="1000"
          src="/blob.svg"
          style={{
            aspectRatio: "1000/1000",
            objectFit: "cover",
            filter: "blur(200px)",
          }}
          width="1000"
        />
      </div>
      <div className="z-10 px-48 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Your employee's schedule, at the&nbsp;
          <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-[length:100%_6px] bg-no-repeat bg-bottom">
            click of a button.
          </span> 
        </h1>
        <p className="mt-8 text-lg text-gray-600">
          RosterGenApp generates your work schedule for you, so you don't ever have to go through the exhausting process of creating it ever again. 
          Fitted to your exact needs, powered by advanced algorithms.
        </p>
        <Link href="/dashboard">
          <Button className="mt-8">Get started</Button>
        </Link>
      </div>
      <div className="z-10 mt-10 w-full md:w-1/2">
        <img
          alt="Decorative"
          className="w-full rounded-t-lg"
          height="600"
          src="example.png"
          style={{
            aspectRatio: "1200/600",
            objectFit: "cover",
          }}
          width="1200"
        />
      </div>
    </div>
  );
}

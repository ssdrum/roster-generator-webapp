import { getUserSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import GoogleSignInButton from '@/app/ui/google-signin-btn';

export default async function Home() {
  const user = await getUserSession();
  // redirect if logged in
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-white'>
      <div className='fixed left-0 top-0 h-full w-full overflow-hidden'>
        <Image
          alt=''
          className='absolute left-0 top-0 h-full w-full object-cover blur-lg'
          height='1000'
          src='/blob.svg'
          style={{
            aspectRatio: '1000/1000',
            objectFit: 'cover',
            filter: 'blur(200px)',
          }}
          width='1000'
        />
      </div>
      <div className='z-10 px-48 py-16 text-center'>
        <h1 className='text-5xl font-bold text-gray-900'>
          Your employee{"'"}s schedule, at the{' '}
          <span className='bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-[length:100%_6px] bg-bottom bg-no-repeat'>
            click of a button.
          </span>
        </h1>
        <p className='mt-8 text-lg text-gray-600'>
          RosterGenApp generates your work schedule for you, so you don{"'"}t
          ever have to go through the exhausting process of creating it ever
          again. Fitted to your exact needs, powered by advanced algorithms.
        </p>
        <GoogleSignInButton />
      </div>
      <div className='z-10 mt-10 w-full md:w-1/2'>
        <Image
          alt='Example'
          className='w-full rounded-t-lg'
          height='600'
          src='/example.png'
          style={{
            aspectRatio: '1200/600',
            objectFit: 'cover',
          }}
          width='1200'
        />
      </div>
    </div>
  );
}

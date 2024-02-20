'use client';
import { signIn } from 'next-auth/react';

const GoogleSignInButton = () => {
  const handleClick = () => {
    signIn('google', { callbackUrl: '/dashboard' }); // Redirect to dasboard on sign-in
  };

  return (
    <div className='mt-10 flex items-center justify-center dark:bg-gray-800'>
      <button
        className='flex gap-2 rounded-lg border border-gray-600 bg-white px-6 py-3 text-black'
        onClick={handleClick}
        type='button'
      >
        <img
          className='h-6 w-6'
          src='https://www.svgrepo.com/show/475656/google-color.svg'
          loading='lazy'
          alt='google logo'
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignInButton;
